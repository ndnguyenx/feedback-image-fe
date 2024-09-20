'use server';
import { api } from '@/helpers/api.helper';
import { cookies } from 'next/headers';
import { IAuthLogin, IResponseLogin } from '@/interfaces/ICommon.interface';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { CONST_VALUES } from '@/constants/values.constant';
import { IUser } from '@/interfaces/models';
import { revalidateTag } from 'next/cache';

const USER = 'USER';
const TAG_NAME = {
  USER: 'USER',
  USERS: 'USERS',
};

export async function login(payload: IAuthLogin) {
  const result = await api<IBaseResponse<IResponseLogin>>({
    url: `http://localhost:3006/api/v1/auth/login`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });

  if (result.data?.token) {
    cookies().set(CONST_VALUES.TOKEN, result.data?.token, {
      httpOnly: true,
      secure: true,
    });
  }

  return result;
}

export async function getMe() {
  const result = await api<IBaseResponse<IUser>>({
      url: `http://localhost:3006/api/v1/auth/get-me`,
      options: {
          method: 'GET',
          next: {
              tags: [TAG_NAME.USER],
          },
      },
  });
  return result;
}

export async function logout() {
  const result = await api<IBaseResponse<IUser>>({
    url: `http://localhost:3006/api/v1/auth/logout`,
    options: {
      method: 'POST',
    },
  });

  cookies().delete(CONST_VALUES.TOKEN);
  revalidateTag(USER);

  return result;
}
