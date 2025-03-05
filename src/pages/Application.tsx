
import React from 'react';
import { Navbar } from '@/components/Navbar';
import { FormProvider } from '@/context/FormContext';
import ApplicationForm from '@/components/application/ApplicationForm';
import { motion } from 'framer-motion';

const Application = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Application for Financing</h1>
            <p className="text-muted-foreground">
              Complete the following steps to submit your application for financing. All information 
              provided will be kept confidential according to our privacy policy.
            </p>
          </div>
          
          <FormProvider>
            <ApplicationForm />
          </FormProvider>
        </motion.div>
      </main>
    </div>
  );
};

export default Application;
