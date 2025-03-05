
import React from 'react';
import { useFormContext } from '@/context/FormContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyNumber: z.string().min(2, 'Company number is required'),
  officialAddress: z.string().min(5, 'Please enter a valid address'),
  contactPerson: z.string().min(2, 'Contact person name is required'),
  contactEmail: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof formSchema>;

const CompanyInfoStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: formData.companyName,
      companyNumber: formData.companyNumber,
      officialAddress: formData.officialAddress,
      contactPerson: formData.contactPerson,
      contactEmail: formData.contactEmail,
    },
  });
  
  const onSubmit = (values: FormValues) => {
    updateFormData(values);
    nextStep();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold">Company Information</h2>
        <p className="text-muted-foreground">Please provide details about your business</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Corporation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Application Number/Individual PIN</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="officialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Official Address</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="123 Business Street, City, Country" 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jane.smith@acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit">
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default CompanyInfoStep;
