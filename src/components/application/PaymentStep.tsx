
import React, { useState } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';
import { submitPaymentRequest } from '@/lib/pesapal';
import { useAuth } from '@/context/AuthContext';
import supabase from '@/lib/supabase';

const PaymentStep = () => {
  const { formData, prevStep, nextStep, resetForm } = useFormContext();
  const { userDetails } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const initiatePayment = async () => {
    if (!userDetails) {
      toast({
        variant: 'destructive',
        title: 'Authentication required',
        description: 'Please log in to proceed with payment',
      });
      return;
    }
    
    try {
      setIsProcessing(true);
      
      const callbackUrl = `${window.location.origin}/payment-callback`;
      
      // Submit payment request to Pesapal
      const paymentResponse = await submitPaymentRequest(
        300, // $300 USD application fee
        formData.email,
        formData.phone,
        formData.firstName,
        formData.lastName,
        callbackUrl
      );
      
      // Save payment record to database
      const { error } = await supabase.from('payments').insert({
        application_id: formData.applicationId || null, // Will be updated after application is created
        amount: 300,
        currency: 'USD',
        status: 'pending',
        reference_id: paymentResponse.orderTrackingId,
        payment_method: 'Pesapal',
      });
      
      if (error) throw error;
      
      // Redirect the user to Pesapal payment page
      window.location.href = paymentResponse.redirectUrl;
    } catch (error: any) {
      console.error('Payment initiation error:', error);
      toast({
        variant: 'destructive',
        title: 'Payment failed',
        description: error.message || 'Could not initiate payment. Please try again.',
      });
      setIsProcessing(false);
    }
  };
  
  const simulateCompletedPayment = () => {
    setIsProcessing(true);
    
    // In a real scenario, this would be triggered by a webhook from Pesapal
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      
      toast({
        title: 'Payment successful',
        description: 'Your application fee has been paid successfully.',
      });
      
      // Move to the next step after 2 seconds
      setTimeout(() => {
        nextStep();
      }, 2000);
    }, 2000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Application Fee Payment</h2>
        <p className="text-muted-foreground mt-1">
          A non-refundable application fee of $300 USD is required to process your application
        </p>
      </div>
      
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {isCompleted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-green-700 mb-2">Payment Successful</h3>
              <p className="text-muted-foreground max-w-md">
                Your payment of $300 USD has been processed successfully. 
                Your application is now being submitted.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Application Fee</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Your application requires a one-time non-refundable processing fee
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground">Application Fee</span>
                      <span className="font-medium">$300.00 USD</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>$300.00 USD</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm">
                <p className="font-medium mb-1">Important Information:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>This fee covers the administrative cost of processing your application</li>
                  <li>The fee is non-refundable regardless of application outcome</li>
                  <li>You will be redirected to our secure payment provider (Pesapal)</li>
                </ul>
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={prevStep} disabled={isProcessing}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
                
                {process.env.NODE_ENV === 'development' ? (
                  <Button onClick={simulateCompletedPayment} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Simulate Payment (Dev Only)'
                    )}
                  </Button>
                ) : (
                  <Button onClick={initiatePayment} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Pay $300 USD Now'
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PaymentStep;
