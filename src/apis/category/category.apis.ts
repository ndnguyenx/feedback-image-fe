'use server';
import { api } from '@/helpers/api.helper';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { ICategory, IQueries } from '@/interfaces/models';


const API_URL = 'http://localhost:3006/api/v1/category';

// Thêm danh mục
export async function createCategory(payload: Partial<ICategory>) {
  try {
    const result = await api<IBaseResponse<ICategory>>({
      url: API_URL,
      options: {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    });
    return result;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
}

// Xóa mềm danh mục
export async function softRemoveCategory(id: string) {
  try {
    const result = await api<IBaseResponse<ICategory>>({
      url: `${API_URL}/soft`, // Endpoint cho soft delete
      options: {
        method: 'DELETE', 
        body: JSON.stringify({ ids: [id], isDeleted: true, deletedAt: new Date() }), // Gửi id, isDeleted và deletedAt
      },
    });
    return result;
  } catch (error) {
    console.error('Error soft deleting category:', error);
    throw error;
  }
}

// Khôi phục danh mục đã xóa mềm
export async function restoreCategory(id: string) {
  try {
      const result = await api<IBaseResponse<ICategory>>({
          url: `http://localhost:3006/api/v1/category/restore`, // Endpoint cho restore
          options: {
              method: 'POST', // Sử dụng POST để khôi phục danh mục
              body: JSON.stringify({ ids:[id] }), // Gửi id của danh mục cần khôi phục
          },
      });
      return result;
  } catch (error) {
      console.error('Error restoring category:', error);
      throw error;
  }
}

// Xóa hoàn toàn danh mục
export async function DeleteCategory(id: string) {
  try {
    const result = await api<IBaseResponse<ICategory>>({
      url: `${API_URL}`, // Endpoint cho soft delete
      options: {
        method: 'DELETE', 
        body: JSON.stringify({ ids: [id] }), // Gửi id, isDeleted và deletedAt
      },
    });
    return result;
  } catch (error) {
    console.error('Error soft deleting category:', error);
    throw error;
  }
}

// sửa danh mục

export const updateCategory = async (id: string, name: {name: string}) => {
  try {
    const result = await api<IBaseResponse<ICategory>>({
      url: `${API_URL}/${id}`, // Endpoint cho soft delete
      options: {
        method: 'PATCH', 
        body: JSON.stringify( name ), 
      },
    });
    return result;
  } catch (error) {
    console.error('Error soft deleting category:', error);
    throw error;
  }
};


// Lấy danh sách các danh mục
export async function getCategories(queryParams?: IQueries): Promise<ICategory[]> {
  try {
    const queryString = queryParams
      ? `?${new URLSearchParams({
          limit: queryParams.limit,
          page: queryParams.page,
          isDeleted: queryParams.isDeleted ? 'true' : 'false', // Chuyển boolean sang string
        }).toString()}`
      : '';

    const result = await api<IBaseResponse<ICategory[]>>({
      url: `${API_URL}${queryString}`,
      options: {
        method: 'GET',
      },
    });

    if (result.error || !result.data) {
      throw new Error(result.error || 'Unknown error');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}


