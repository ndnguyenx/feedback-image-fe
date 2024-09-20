'use server';
import { api } from '@/helpers/api.helper';
import { cookies } from 'next/headers';
import { IAuthLogin, IResponseLogin } from '@/interfaces/ICommon.interface';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { CONST_VALUES } from '@/constants/values.constant';

const USER = 'USER';

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

// export async function getMe() {
//   const result = await api<IBaseResponse<IUser>>({
//     url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.GET_ME}`,
//     options: {
//       method: BoEnumsCommon.EMethodApi.GET,
//       next: {
//         tags: [USER],
//       },
//     },
//   });
//   return result;
// }

// export async function logout() {
//   const result = await api<IBaseResponse<IUser>>({
//     url: `${CONST_APIS.VERSION_V1}/${CONST_APIS.FEATURES.COMMON.AUTH}/${CONST_APIS.FEATURES.AUTH.LOGOUT}`,
//     options: {
//       method: BoEnumsCommon.EMethodApi.POST,
//     },
//   });

//   cookies().delete(CONST_VALUES.TOKEN);
//   revalidateTag(USER);

//   return result;
// }
