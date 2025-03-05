
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
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const formSchema = z.object({
  isShovelReady: z.enum(['yes', 'no']),
  financingAmount: z.string().min(1, 'Please enter a financing amount'),
  interestRate: z.string().min(1, 'Please enter an interest rate'),
  loanTerm: z.string().min(1, 'Please enter a loan term'),
  loanDate: z.date({
    required_error: "Please select a date",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const FinalDetailsStep = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormContext();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isShovelReady: (formData.isShovelReady as 'yes' | 'no') || 'no',
      financingAmount: formData.financingAmount,
      interestRate: formData.interestRate,
      loanTerm: formData.loanTerm,
      loanDate: formData.loanDate || undefined,
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
        <h2 className="text-2xl font-bold">Final Details</h2>
        <p className="text-muted-foreground">Provide details about your financing request</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="isShovelReady"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Is the project shovel ready?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="shovelYes" />
                      <Label htmlFor="shovelYes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="shovelNo" />
                      <Label htmlFor="shovelNo">No</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="financingAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>How much financing is required?</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      placeholder="100000" 
                      className="pl-8" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormDescription>Amount in USD</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requested Interest Rate</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="5.5" 
                        className="pr-8" 
                        {...field} 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Loan Term Request</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="60" 
                        className="pr-16" 
                        {...field} 
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">months</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="loanDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select your preferred date for the loan to start.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit">
              Continue to Document Upload
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default FinalDetailsStep;
