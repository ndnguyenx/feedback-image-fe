'use server';
import { api } from '@/helpers/api.helper';
import { IBaseResponse } from '@/interfaces/IBaseResponse.interfaces';
import { IFeedBack } from '@/interfaces/models';

const API_URL = 'http://localhost:3006/api/v1/feedback';

// Thêm phản hồi
export async function createFeedback(formData: FormData) {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: API_URL,
      options: {
        method: 'POST',
        body: formData,
      },
    });
    return result;
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
}

// Cập nhật phản hồi
export async function updateFeedback(id: string, data: Partial<IFeedBack>) {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: `${API_URL}/${id}`, // Endpoint cập nhật
      options: {
        method: 'PATCH', // Sử dụng PATCH để cập nhật
        body: JSON.stringify(data), // Gửi dữ liệu cần cập nhật
      },
    });
    return result;
  } catch (error) {
    console.error('Error updating feedback:', error);
    throw error;
  }
}


// Xóa mềm phản hồi
export async function softRemoveFeedback(id: string) {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: `${API_URL}/soft`, // Endpoint cho soft delete
      options: {
        method: 'DELETE',
        body: JSON.stringify({ ids: [id], isDeleted: true, deletedAt: new Date() }), // Gửi id, isDeleted và deletedAt
      },
    });
    return result;
  } catch (error) {
    console.error('Error soft deleting feedback:', error);
    throw error;
  }
}

// Khôi phục phản hồi đã xóa mềm
export async function restoreFeedback(id: string) {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: `${API_URL}/restore`, // Endpoint cho restore
      options: {
        method: 'POST', // Sử dụng POST để khôi phục phản hồi
        body: JSON.stringify({ ids: [id] }), // Gửi id của phản hồi cần khôi phục
      },
    });
    return result;
  } catch (error) {
    console.error('Error restoring feedback:', error);
    throw error;
  }
}

// Xóa hoàn toàn phản hồi
export async function deleteFeedback(id: string) {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: `${API_URL}`, // Endpoint cho xóa hoàn toàn
      options: {
        method: 'DELETE',
        body: JSON.stringify({ ids: [id] }), // Gửi id của phản hồi cần xóa
      },
    });
    return result;
  } catch (error) {
    console.error('Error deleting feedback:', error);
    throw error;
  }
}

// Lấy danh sách các phản hồi
export async function getFeedbacks(queryParams?: any): Promise<IFeedBack[]> {
  try {
    const queryString = queryParams
      ? `?${new URLSearchParams(queryParams).toString()}`
      : '';
    const result = await api<IBaseResponse<IFeedBack[]>>({
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
    console.error('Error fetching feedbacks:', error);
    throw error;
  }
}

export async function getFeedbackById(id: string): Promise<IBaseResponse<IFeedBack>> {
  try {
    const result = await api<IBaseResponse<IFeedBack>>({
      url: `${API_URL}/${id}`, 
      options: {
        method: 'GET',
      },
    });
    return result;
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    throw error;
  }
}
