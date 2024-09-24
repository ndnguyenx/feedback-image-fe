'use server';
import { api } from '@/helpers/api.helper';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { IQueries, ISubCategory } from '@/interfaces/models';

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

// Xóa mềm danh mục con
export async function softRemoveSubCategory(id: string) {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
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

// Xóa hoàn toàn danh mục con
export async function DeleteSubCategory(id: string) {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
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



// Khôi phục danh mục đã xóa mềm
export async function restoreSubCategory(id: string) {
  try {
      const result = await api<IBaseResponse<ISubCategory>>({
          url: `http://localhost:3006/api/v1/sub-category/restore`, // Endpoint cho restore
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

// Cập nhật một danh mục con
export async function updateSubCategory(id: string, payload: Partial<ISubCategory>): Promise<ISubCategory> {
  try {
    const result = await api<IBaseResponse<ISubCategory>>({
      url: `${API_URL}/${id}`,
      options: {
        method: 'PATCH',
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
export async function getAllSubCategories(queryParams?: IQueries): Promise<ISubCategory[]> {
  try {
    const queryString = queryParams
      ? `?${new URLSearchParams({
          limit: queryParams.limit,
          page: queryParams.page,
          isDeleted: queryParams.isDeleted ? 'true' : 'false', 
        }).toString()}`
      : '';
    const result = await api<IBaseResponse<ISubCategory[]>>({
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
