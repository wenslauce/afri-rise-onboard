
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

const formSchema = z.object({
  hasForeignPresence: z.enum(['yes', 'no']),
  hasPreviousFinancing: z.enum(['yes', 'no']),
});

type FormValues = z.infer<typeof formSchema>;

const FundingBackgroundStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hasForeignPresence: (formData.hasForeignPresence as 'yes' | 'no') || 'no',
      hasPreviousFinancing: (formData.hasPreviousFinancing as 'yes' | 'no') || 'no',
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
        <h2 className="text-2xl font-bold">Funding Background</h2>
        <p className="text-muted-foreground">Tell us about your company's financial history</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="hasForeignPresence"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Is the company present in foreign markets?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="foreignYes" />
                      <Label htmlFor="foreignYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="foreignNo" />
                      <Label htmlFor="foreignNo">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="hasPreviousFinancing"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Has the company previously received financing?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="financingYes" />
                      <Label htmlFor="financingYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="financingNo" />
                      <Label htmlFor="financingNo">No</Label>
                    </div>
                  </RadioGroup>
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

export default FundingBackgroundStep;
