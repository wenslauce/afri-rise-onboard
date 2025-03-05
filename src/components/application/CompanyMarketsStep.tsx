
import React from 'react';
import { useFormContext, FormData } from '@/context/FormContext';
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
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';

const formSchema = z.object({
  businessModel: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  competitiveAdvantage: z.string().min(20, 'Please provide a detailed description (at least 20 characters)'),
  competitors: z.string().min(5, 'Please list your main competitors'),
});

type FormValues = z.infer<typeof formSchema>;

const CompanyMarketsStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessModel: formData.businessModel,
      competitiveAdvantage: formData.competitiveAdvantage,
      competitors: formData.competitors,
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
        <h2 className="text-2xl font-bold">Company Markets</h2>
        <p className="text-muted-foreground">Tell us about your business model and market position</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is the company's business model?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your business model in detail..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="competitiveAdvantage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is the biggest competitive advantage?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what sets your company apart from competitors..." 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="competitors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Who are the three largest competitors?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List your main competitors, one per line..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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

export default CompanyMarketsStep;
