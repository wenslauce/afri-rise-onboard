
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getTransactionStatus } from '@/lib/pesapal';
import supabase from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';

const PaymentCallback = () => {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const orderTrackingId = searchParams.get('OrderTrackingId');
        
        if (!orderTrackingId) {
          throw new Error('Missing order tracking ID');
        }
        
        // Get payment status from Pesapal
        const transactionStatus = await getTransactionStatus(orderTrackingId);
        
        // Update payment status in the database
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('id, application_id')
          .eq('reference_id', orderTrackingId)
          .single();
        
        if (paymentError) throw paymentError;
        
        let newStatus = 'pending';
        
        if (transactionStatus.status === 'COMPLETED') {
          newStatus = 'completed';
          setStatus('success');
          
          toast({
            title: 'Payment successful',
            description: 'Your application fee has been paid successfully',
          });
        } else if (transactionStatus.status === 'FAILED') {
          newStatus = 'failed';
          setStatus('failed');
          
          toast({
            variant: 'destructive',
            title: 'Payment failed',
            description: 'Your payment was not successful',
          });
        } else {
          setStatus('pending');
        }
        
        // Update payment status
        await supabase
          .from('payments')
          .update({
            status: newStatus,
            payment_method: transactionStatus.paymentMethod,
          })
          .eq('id', paymentData.id);
          
      } catch (error: any) {
        console.error('Error verifying payment:', error);
        setStatus('failed');
        toast({
          variant: 'destructive',
          title: 'Verification error',
          description: error.message || 'Could not verify payment status',
        });
      } finally {
        setLoading(false);
      }
    };
    
    verifyPayment();
  }, [location.search]);
  
  const handleContinue = () => {
    if (status === 'success') {
      navigate('/dashboard');
    } else {
      navigate('/application');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-6">
          <Logo className="h-12 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Afri-Rise</h1>
          <p className="text-muted-foreground">Fund Management Consultancy</p>
        </div>
        
        <Card>
          <CardContent className="p-6 text-center">
            {loading ? (
              <div className="py-12 flex flex-col items-center">
                <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                <h2 className="text-xl font-medium mb-2">Verifying Payment</h2>
                <p className="text-muted-foreground">
                  Please wait while we verify your payment status...
                </p>
              </div>
            ) : status === 'success' ? (
              <div className="py-8">
                <div className="bg-green-100 p-4 rounded-full inline-flex mx-auto mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-xl font-medium text-green-700 mb-2">Payment Successful</h2>
                <p className="text-muted-foreground mb-6">
                  Your payment of $300 USD has been processed successfully. 
                  Your application is now being submitted.
                </p>
                <Button onClick={handleContinue} className="w-full">
                  Continue to Dashboard
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <div className="bg-red-100 p-4 rounded-full inline-flex mx-auto mb-4">
                  <AlertTriangle className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-xl font-medium text-red-700 mb-2">Payment Failed</h2>
                <p className="text-muted-foreground mb-6">
                  Your payment could not be processed. Please try again or contact support
                  if the problem persists.
                </p>
                <Button onClick={handleContinue} className="w-full">
                  Return to Application
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentCallback;
