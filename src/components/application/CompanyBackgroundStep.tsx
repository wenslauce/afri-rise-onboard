
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { motion } from 'framer-motion';

const formSchema = z.object({
  foundedYear: z.string().min(4, 'Please enter a valid year'),
  officeLocations: z.string().min(2, 'Please provide your office locations'),
  industry: z.string().min(2, 'Please select your industry'),
  employeeCount: z.string().min(1, 'Please select employee count'),
});

type FormValues = z.infer<typeof formSchema>;

const employeeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+"
];

const industryOptions = [
  "Agriculture",
  "Construction",
  "Education",
  "Energy",
  "Finance",
  "Healthcare",
  "Hospitality",
  "Information Technology",
  "Manufacturing",
  "Media",
  "Real Estate",
  "Retail",
  "Telecommunications",
  "Transportation",
  "Other"
];

const CompanyBackgroundStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foundedYear: formData.foundedYear,
      officeLocations: formData.officeLocations,
      industry: formData.industry,
      employeeCount: formData.employeeCount,
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
        <h2 className="text-2xl font-bold">Company Background</h2>
        <p className="text-muted-foreground">Tell us more about your company's history and structure</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="foundedYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>In which year was the company founded?</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="2010" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="officeLocations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>In which cities does the company have offices?</FormLabel>
                <FormControl>
                  <Input placeholder="Nairobi, Mombasa, Kisumu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Which industry does the company belong to?</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industryOptions.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="employeeCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is the number of employees?</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {employeeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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

export default CompanyBackgroundStep;
