import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';

export interface FavoriteItem {
  id: string;
  userId: string;
  patternId: string;
  patternName: string;
  userNotes?: string;
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  patternId?: string;
  patternName?: string;
  projectType?: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface ChatConversationRecord {
  id: string;
  userId: string;
  title: string;
  lastMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessageRecord {
  id: string;
  userId: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

// ---------------- FAVORITES ----------------
export async function addFavorite(
  userId: string,
  patternId: string,
  patternName: string,
  userNotes: string = ''
): Promise<string> {
  const favoriteId = `${patternId}_${Date.now()}`;
  const path = `users/${userId}/favorites/${favoriteId}`;
  const docRef = doc(db, 'users', userId, 'favorites', favoriteId);

  const payload: FavoriteItem = {
    id: favoriteId,
    userId,
    patternId,
    patternName,
    createdAt: new Date().toISOString(),
  };

  if (userNotes.trim()) {
    payload.userNotes = userNotes.trim();
  }

  try {
    await setDoc(docRef, payload);
    return favoriteId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function removeFavorite(userId: string, favoriteId: string): Promise<void> {
  const path = `users/${userId}/favorites/${favoriteId}`;
  const docRef = doc(db, 'users', userId, 'favorites', favoriteId);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function subscribeToFavorites(
  userId: string,
  onUpdate: (favorites: FavoriteItem[]) => void,
  onError?: (error: Error) => void
) {
  const path = `users/${userId}/favorites`;
  const colRef = collection(db, 'users', userId, 'favorites');

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: FavoriteItem[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as FavoriteItem);
      });
      // Sort in-memory to prevent complex composite index requirements
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdate(items);
    },
    (error) => {
      onError?.(error as Error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// ---------------- INQUIRIES ----------------
export async function createInquiry(
  userId: string,
  userName: string,
  userEmail: string,
  message: string,
  patternId?: string,
  patternName?: string,
  projectType: string = 'Commercial Licensing'
): Promise<string> {
  const inquiryId = `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const path = `inquiries/${inquiryId}`;
  const docRef = doc(db, 'inquiries', inquiryId);

  const payload: InquiryRecord = {
    id: inquiryId,
    userId,
    userName,
    userEmail,
    message,
    projectType,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  if (patternId) payload.patternId = patternId;
  if (patternName) payload.patternName = patternName;

  try {
    await setDoc(docRef, payload);
    return inquiryId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeToUserInquiries(
  userId: string,
  onUpdate: (inquiries: InquiryRecord[]) => void,
  onError?: (error: Error) => void
) {
  const path = 'inquiries';
  const q = query(collection(db, 'inquiries'), where('userId', '==', userId));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: InquiryRecord[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as InquiryRecord);
      });
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      onUpdate(items);
    },
    (error) => {
      onError?.(error as Error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// ---------------- CHAT CONVERSATIONS & MESSAGES ----------------
export async function createConversation(
  userId: string,
  initialTitle: string = 'Design Consultation'
): Promise<string> {
  const conversationId = `conv_${Date.now()}`;
  const path = `users/${userId}/conversations/${conversationId}`;
  const docRef = doc(db, 'users', userId, 'conversations', conversationId);
  const now = new Date().toISOString();

  const payload: ChatConversationRecord = {
    id: conversationId,
    userId,
    title: initialTitle.slice(0, 140),
    lastMessage: 'Conversation initiated',
    createdAt: now,
    updatedAt: now,
  };

  try {
    await setDoc(docRef, payload);
    return conversationId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function addChatMessage(
  userId: string,
  conversationId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const messagePath = `users/${userId}/conversations/${conversationId}/messages/${messageId}`;
  const msgDocRef = doc(db, 'users', userId, 'conversations', conversationId, 'messages', messageId);
  const now = new Date().toISOString();

  const msgPayload: ChatMessageRecord = {
    id: messageId,
    userId,
    conversationId,
    role,
    content: content.slice(0, 4900),
    createdAt: now,
  };

  try {
    await setDoc(msgDocRef, msgPayload);

    // Update parent conversation summary
    const convRef = doc(db, 'users', userId, 'conversations', conversationId);
    await setDoc(
      convRef,
      {
        lastMessage: content.slice(0, 200),
        updatedAt: now,
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, messagePath);
  }
}

export function subscribeToConversations(
  userId: string,
  onUpdate: (conversations: ChatConversationRecord[]) => void,
  onError?: (error: Error) => void
) {
  const path = `users/${userId}/conversations`;
  const colRef = collection(db, 'users', userId, 'conversations');

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: ChatConversationRecord[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as ChatConversationRecord);
      });
      items.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
      onUpdate(items);
    },
    (error) => {
      onError?.(error as Error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeToMessages(
  userId: string,
  conversationId: string,
  onUpdate: (messages: ChatMessageRecord[]) => void,
  onError?: (error: Error) => void
) {
  const path = `users/${userId}/conversations/${conversationId}/messages`;
  const colRef = collection(db, 'users', userId, 'conversations', conversationId, 'messages');

  return onSnapshot(
    colRef,
    (snapshot) => {
      const items: ChatMessageRecord[] = [];
      snapshot.forEach((doc) => {
        items.push(doc.data() as ChatMessageRecord);
      });
      items.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
      onUpdate(items);
    },
    (error) => {
      onError?.(error as Error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}
