'use server';
import { api } from '@/helpers/api.helper';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { ICategory } from '@/interfaces/models';

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
      url: `${API_URL}/soft/${id}`, // Endpoint cho soft delete
      options: {
        method: 'DELETE', // Sử dụng DELETE để xóa mềm
        body: JSON.stringify({ isDeleted: true, deletedAt: new Date() }), // Cập nhật isDeleted và deletedAt
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
      url: `${API_URL}/restore/${id}`, // Endpoint cho restore
      options: {
        method: 'PATCH', // Sử dụng PATCH để khôi phục danh mục
        body: JSON.stringify({ isDeleted: false, deletedAt: null }), // Đặt lại isDeleted và xóa deletedAt
      },
    });
    return result;
  } catch (error) {
    console.error('Error restoring category:', error);
    throw error;
  }
}

// Xóa hoàn toàn danh mục
export async function deleteCategory(id: string) {
  try {
    const result = await api<IBaseResponse<null>>({
      url: `${API_URL}/${id}`,
      options: {
        method: 'DELETE',
      },
    });
    return result;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
}

// Lấy danh sách các danh mục
export async function getCategories(): Promise<ICategory[]> {
  try {
    const result = await api<IBaseResponse<ICategory[]>>({
      url: `${API_URL}?limit=20&page=1`,
      options: {
        method: 'GET',
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không có
    if (result.error || !result.data) {
      throw new Error(result.error || 'Unknown error');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}
