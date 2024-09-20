'use server';
import { api } from '@/helpers/api.helper';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { ISubCategory } from '@/interfaces/models';

const API_URL = 'http://localhost:3006/api/v1/sub-category';

// Thêm danh mục con
export async function createSubCategory(payload: Partial<ISubCategory>): Promise<ISubCategory> {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
      url: API_URL,
      options: {
        method: 'POST',
        body: JSON.stringify(payload),
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không có
    if (result.error || !result.data) {
      throw new Error(result.error || result.message || 'Unknown error');
    }
    return result.data;
  } catch (error) {
    console.error('Error creating sub-category:', error);
    throw error;
  }
}

// Xóa nhiều danh mục con
export async function deleteSubCategories(ids: string[]): Promise<null> {
  try {
    const result = await api<IBaseResponse<null>>({
      url: API_URL,
      options: {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không hợp lệ
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data !== null) {
      throw new Error('Unexpected data received');
    }
    return null;
  } catch (error) {
    console.error('Error deleting sub-categories:', error);
    throw error;
  }
}

// Xóa một danh mục con
export async function deleteSubCategory(id: string): Promise<null> {
  try {
    const result = await api<IBaseResponse<null>>({
      url: `${API_URL}/${id}`,
      options: {
        method: 'DELETE',
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không hợp lệ
    if (result.error) {
      throw new Error(result.error);
    }
    if (result.data !== null) {
      throw new Error('Unexpected data received');
    }
    return null;
  } catch (error) {
    console.error('Error deleting sub-category:', error);
    throw error;
  }
}


// Soft Delete danh mục con (chuyển isDeleted thành true)
export async function softDeleteSubCategory(id: string): Promise<ISubCategory> {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
      url: `${API_URL}/${id}`, // Sử dụng URL của danh mục con
      options: {
        method: 'DELETE', // Sử dụng DELETE cho soft delete
        body: JSON.stringify({ isDeleted: true }), // Chuyển isDeleted thành true
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (result.error || !result.data) {
      throw new Error(result.error || result.message || 'Có lỗi xảy ra khi thực hiện soft delete.');
    }
    return result.data;
  } catch (error) {
    console.error('Lỗi khi thực hiện soft delete danh mục con:', error);
    throw error;
  }
}

// Cập nhật một danh mục con
export async function updateSubCategory(id: string, payload: Partial<ISubCategory>): Promise<ISubCategory> {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
      url: `${API_URL}/${id}`,
      options: {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không có
    if (result.error || !result.data) {
      throw new Error(result.error || result.message || 'Có lỗi xảy ra khi cập nhật danh mục con.');
    }
    return result.data;
  } catch (error) {
    console.error('Error updating sub-category:', error);
    throw error;
  }
}


// Lấy tất cả danh mục con
export async function getAllSubCategories(): Promise<ISubCategory[]> {
  try {
    const result = await api<IBaseResponse<ISubCategory[]>>({
      url: API_URL,
      options: {
        method: 'GET',
      },
    });

    // Kiểm tra nếu có lỗi hoặc dữ liệu không có
    if (result.error || !result.data) {
      throw new Error(result.error || result.message || 'Unknown error');
    }
    return result.data;
  } catch (error) {
    console.error('Error fetching sub-categories:', error);
    throw error;
  }
}
