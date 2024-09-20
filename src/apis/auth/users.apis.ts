'use server';
import { CONST_APIS } from '@/constants/apis.constant';
import { api } from '@/helpers/api.helper';
import { revalidateTag } from 'next/cache';
import { IUser } from '@/interfaces/models';
import {
  IBaseResponse
} from '@/interfaces/IBaseResponse.interfaces';

const TAG_NAME = {
  USER: ' USER',
  USERS: ' USERS',
};


export async function create(payload: Partial<IUser>) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  });
  return result;
}

export async function findAll() {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'GET',
    },
  });
  return result;
}

export async function findOneById(id: string) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'GET',
      next: {
        tags: [`${TAG_NAME.USER}-${id}`],
      },
    },
  });
  return result;
}

export async function findOneBySlug(slug: string) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}/${slug}`,
    options: {
      method: 'GET',
      next: {
        tags: [`${TAG_NAME.USER}-${slug}`],
      },
    },
  });
  return result;
}

export async function update(id: string, payload: Partial<IUser>) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${id}`,
    options: {
      method: 'PATCH',
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.USERS);
  return result;
}

export async function restoreMulti(payload: {ids: string[]}) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'POST',
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.USERS);
  return result;
}

export async function softRemoveMulti(payload: {ids: string[]}) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'DELETE',
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.USERS);
  return result;
}

export async function removeMulti(payload: {ids: string[]}) {
  const result = await api<IBaseResponse<IUser>>({
    url: `${CONST_APIS.CONT_HOST_SERVER}/${CONST_APIS.CONST_VERSION}/${CONST_APIS.CONST_AUTH}`,
    options: {
      method: 'DELETE',
      body: JSON.stringify(payload),
    },
  });
  revalidateTag(TAG_NAME.USERS);
  return result;
}
