
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Step 1: Personal Details Schema
export const personalDetailsSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
});

export const PersonalDetailsForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Personal Details</h2>
        <p className="text-muted-foreground">
          Please provide your basic contact information.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone/Mobile</FormLabel>
              <FormControl>
                <Input placeholder="+1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

// Step 2: Company Information Schema
export const companyInfoSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  registrationNumber: z.string().min(1, { message: "Registration number is required" }),
  officialAddress: z.string().min(5, { message: "Address is required" }),
  contactPerson: z.string().min(2, { message: "Contact person is required" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
});

export const CompanyInfoForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Company Information</h2>
        <p className="text-muted-foreground">
          Please provide details about your company.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
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
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Registration Number/Individual PIN</FormLabel>
              <FormControl>
                <Input placeholder="RC123456" {...field} />
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
                  placeholder="123 Business Avenue, City, Country"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <Input placeholder="contact@acmecorp.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

// Step 3: Company Background Schema
export const companyBackgroundSchema = z.object({
  foundingYear: z.string().min(4, { message: "Please provide a valid year" }),
  officeLocations: z.string().min(1, { message: "Please provide office locations" }),
  industry: z.string().min(1, { message: "Please select an industry" }),
  employees: z.string().min(1, { message: "Please select a range" }),
});

export const CompanyBackgroundForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Company Background</h2>
        <p className="text-muted-foreground">
          Please provide background details about your company.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="foundingYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>In Which Year Was The Company Founded?</FormLabel>
              <FormControl>
                <Input placeholder="2015" type="number" {...field} />
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
              <FormLabel>In Which Cities Does The Company Have Offices?</FormLabel>
              <FormControl>
                <Input placeholder="Nairobi, Cape Town, Lagos" {...field} />
              </FormControl>
              <FormDescription>
                Enter city names separated by commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Which Industry Does The Company Belong To?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="transport">Transport & Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What Is The Number Of Employees?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="501-1000">501-1000</SelectItem>
                  <SelectItem value="1000+">1000+</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

// Step 4: Funding Background Schema
export const fundingBackgroundSchema = z.object({
  foreignMarkets: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  previousFinancing: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
});

export const FundingBackgroundForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Funding Background</h2>
        <p className="text-muted-foreground">
          Please provide information about your company's funding history.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8">
        <FormField
          control={form.control}
          name="foreignMarkets"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Is The Company Present In Foreign Markets?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="previousFinancing"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Has The Company Previously Received Financing?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

// Step 5: Company Markets Schema
export const companyMarketsSchema = z.object({
  businessModel: z.string().min(10, { message: "Please provide a description of your business model" }),
  competitiveAdvantage: z.string().min(10, { message: "Please describe your competitive advantage" }),
  competitors: z.string().min(3, { message: "Please list your major competitors" }),
});

export const CompanyMarketsForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Company Markets</h2>
        <p className="text-muted-foreground">
          Please provide information about your company's market position.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="businessModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>What Is The Company's Business Model?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your company's business model..."
                  className="resize-none min-h-[120px]"
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
              <FormLabel>What Is The Biggest Competitive Advantage?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your competitive advantage..."
                  className="resize-none min-h-[120px]"
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
              <FormLabel>Who Are The Three Largest Competitors?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List your major competitors..."
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Please list one competitor per line
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

// Step 6: Final Schema
export const finalSchema = z.object({
  shovelReady: z.enum(["yes", "no"], {
    required_error: "Please select an option",
  }),
  financingAmount: z.string().min(1, { message: "Financing amount is required" }),
  interestRate: z.string().min(1, { message: "Interest rate is required" }),
  loanTerm: z.string().min(1, { message: "Loan term is required" }),
  date: z.date({
    required_error: "Please select a date",
  }),
});

export const FinalForm = ({ form }: { form: any }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Final Details</h2>
        <p className="text-muted-foreground">
          Please provide final information about your project and financing needs.
        </p>
      </div>
      
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h3 className="text-lg font-medium text-amber-800 mb-2">Required Documentation</h3>
        <p className="text-amber-700 mb-4">Please make sure you have the following documents ready to upload:</p>
        <ul className="list-disc pl-5 space-y-1 text-amber-700">
          <li>Project Summary</li>
          <li>Audited Accounts</li>
          <li>2 Year Management Accounts</li>
          <li>5 Year Cash Flow Projection</li>
          <li>Company Documents (Certificate of Incorporation, PIN Certificate, CR12, Tax Compliance, Operating Licenses)</li>
          <li>Directors Documents (ID, PIN)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="shovelReady"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Is The Project Shovel Ready?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Yes
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      No
                    </FormLabel>
                  </FormItem>
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
              <FormLabel>How Much Financing Is Required? (USD)</FormLabel>
              <FormControl>
                <Input placeholder="500,000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested Interest Rate (%)</FormLabel>
              <FormControl>
                <Input placeholder="5.5" {...field} />
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
              <FormLabel>Loan Term Request (years)</FormLabel>
              <FormControl>
                <Input placeholder="5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
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
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The preferred date for financing
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Application Fee</h4>
          <p className="text-muted-foreground mb-4">
            A non-refundable application fee of $300 USD is required to process your application.
          </p>
          <Button className="w-full" type="button">
            Pay Application Fee ($300 USD)
          </Button>
        </div>
      </div>
    </div>
  );
};
