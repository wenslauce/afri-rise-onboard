
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Pesapal credentials
const CONSUMER_KEY = 'qkio1BGGYAXTu2JOfm7XSXNruoZsrqEW';
const CONSUMER_SECRET = 'osGQ364R49cXKeOYSpaOnT++rHs=';
const PESAPAL_API_URL = 'https://pay.pesapal.com/v3';

interface PesapalTokenResponse {
  token: string;
  expiryDate: string;
}

interface PesapalPaymentRequest {
  id: string;
  amount: number;
  currency: string;
  description: string;
  callbackUrl: string;
  cancellationUrl: string;
  notification_id: string;
  billing_address: {
    email_address: string;
    phone_number: string;
    first_name: string;
    last_name: string;
  };
}

export const getAuthToken = async (): Promise<string> => {
  try {
    const response = await axios.post<PesapalTokenResponse>(
      `${PESAPAL_API_URL}/api/Auth/RequestToken`,
      {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET,
      }
    );
    
    return response.data.token;
  } catch (error) {
    console.error('Error getting Pesapal token:', error);
    throw new Error('Failed to authenticate with Pesapal');
  }
};

export const submitPaymentRequest = async (
  amount: number,
  email: string,
  phone: string,
  firstName: string,
  lastName: string,
  callbackUrl: string
): Promise<{ redirectUrl: string; orderTrackingId: string }> => {
  try {
    const token = await getAuthToken();
    
    const paymentRequest: PesapalPaymentRequest = {
      id: uuidv4(),
      amount,
      currency: 'USD',
      description: 'Application Fee for Afri-Rise Financing',
      callbackUrl,
      cancellationUrl: window.location.origin + '/dashboard',
      notification_id: 'AFRIRISE_' + Date.now(),
      billing_address: {
        email_address: email,
        phone_number: phone,
        first_name: firstName,
        last_name: lastName,
      },
    };
    
    const response = await axios.post(
      `${PESAPAL_API_URL}/api/Transactions/SubmitOrderRequest`,
      paymentRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return {
      redirectUrl: response.data.redirect_url,
      orderTrackingId: response.data.order_tracking_id,
    };
  } catch (error) {
    console.error('Error submitting payment to Pesapal:', error);
    throw new Error('Failed to initiate payment');
  }
};

export const getTransactionStatus = async (
  orderTrackingId: string
): Promise<{ status: string; paymentMethod: string }> => {
  try {
    const token = await getAuthToken();
    
    const response = await axios.get(
      `${PESAPAL_API_URL}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    
    return {
      status: response.data.payment_status_description,
      paymentMethod: response.data.payment_method,
    };
  } catch (error) {
    console.error('Error checking transaction status:', error);
    throw new Error('Failed to check payment status');
  }
};
