
import React, { useEffect } from 'react';
import { useFormContext } from '@/context/FormContext';
import { Card, CardContent } from '@/components/ui/card';
import PersonalDetailsStep from './PersonalDetailsStep';
import CompanyInfoStep from './CompanyInfoStep';
import CompanyBackgroundStep from './CompanyBackgroundStep';
import FundingBackgroundStep from './FundingBackgroundStep';
import CompanyMarketsStep from './CompanyMarketsStep';
import FinalDetailsStep from './FinalDetailsStep';
import DocumentUploadStep from './DocumentUploadStep';
import PaymentStep from './PaymentStep';
import ReviewStep from './ReviewStep';
import FormStepIndicator from './FormStepIndicator';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import supabase from '@/lib/supabase';

const ApplicationForm = () => {
  const { currentStep, formData, updateFormData } = useFormContext();
  const { userDetails, loading } = useAuth();
  const navigate = useNavigate();
  
  // Check if user is authenticated
  useEffect(() => {
    // If not loading and no user, show toast and pre-fill form with saved data if available
    if (!loading && !userDetails) {
      const savedFormData = localStorage.getItem('applicationFormData');
      if (savedFormData) {
        try {
          const parsedData = JSON.parse(savedFormData);
          updateFormData(parsedData);
          
          toast({
            title: 'Data restored',
            description: 'Your previous form data has been restored',
          });
        } catch (error) {
          console.error('Error parsing saved form data:', error);
        }
      }
    }
    
    // If user is authenticated, try to load their in-progress application
    if (userDetails) {
      const loadUserApplication = async () => {
        try {
          const { data, error } = await supabase
            .from('applications')
            .select('*')
            .eq('user_id', userDetails.id)
            .eq('status', 'draft')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();
            
          if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
            throw error;
          }
          
          if (data) {
            updateFormData({
              firstName: data.first_name,
              lastName: data.last_name,
              email: data.email,
              phone: data.phone,
              companyName: data.company_name,
              companyNumber: data.registration_number,
              officialAddress: data.official_address,
              contactPerson: data.contact_person,
              contactEmail: data.contact_email,
              foundedYear: data.founding_year,
              officeLocations: data.office_locations,
              industry: data.industry,
              employeeCount: data.employees,
              hasForeignPresence: data.foreign_markets ? 'yes' : 'no',
              hasPreviousFinancing: data.previous_financing ? 'yes' : 'no',
              businessModel: data.business_model,
              competitiveAdvantage: data.competitive_advantage,
              competitors: data.competitors,
              isShovelReady: data.shovel_ready ? 'yes' : 'no',
              financingAmount: data.financing_amount?.toString() || '',
              interestRate: data.interest_rate?.toString() || '',
              loanTerm: data.loan_term || '',
              loanDate: data.application_date ? new Date(data.application_date) : null,
              applicationId: data.id,
            });
            
            toast({
              title: 'Application loaded',
              description: 'Your draft application has been loaded',
            });
          }
        } catch (error) {
          console.error('Error loading user application:', error);
        }
      };
      
      loadUserApplication();
    }
  }, [userDetails, loading, updateFormData]);
  
  // Auto-save form data when it changes
  useEffect(() => {
    if (formData) {
      localStorage.setItem('applicationFormData', JSON.stringify(formData));
      
      // If user is authenticated and we have applicationId, save to database
      if (userDetails && formData.applicationId) {
        const saveApplication = async () => {
          try {
            const { error } = await supabase
              .from('applications')
              .update({
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                company_name: formData.companyName,
                registration_number: formData.companyNumber,
                official_address: formData.officialAddress,
                contact_person: formData.contactPerson,
                contact_email: formData.contactEmail,
                founding_year: formData.foundedYear,
                office_locations: formData.officeLocations,
                industry: formData.industry,
                employees: formData.employeeCount,
                foreign_markets: formData.hasForeignPresence === 'yes',
                previous_financing: formData.hasPreviousFinancing === 'yes',
                business_model: formData.businessModel,
                competitive_advantage: formData.competitiveAdvantage,
                competitors: formData.competitors,
                shovel_ready: formData.isShovelReady === 'yes',
                financing_amount: formData.financingAmount ? parseFloat(formData.financingAmount) : null,
                interest_rate: formData.interestRate ? parseFloat(formData.interestRate) : null,
                loan_term: formData.loanTerm,
                application_date: formData.loanDate,
                updated_at: new Date(),
              })
              .eq('id', formData.applicationId);
              
            if (error) throw error;
          } catch (error) {
            console.error('Error saving application to database:', error);
          }
        };
        
        saveApplication();
      }
      // If user is authenticated but no applicationId, create new application
      else if (userDetails && currentStep > 1 && !formData.applicationId) {
        const createApplication = async () => {
          try {
            const { data, error } = await supabase
              .from('applications')
              .insert({
                user_id: userDetails.id,
                status: 'draft',
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                phone: formData.phone,
              })
              .select('id')
              .single();
              
            if (error) throw error;
            
            if (data) {
              updateFormData({
                applicationId: data.id,
              });
            }
          } catch (error) {
            console.error('Error creating application in database:', error);
          }
        };
        
        createApplication();
      }
    }
  }, [formData, userDetails, currentStep, updateFormData]);
  
  const renderStep = () => {
    // If not authenticated and past step 1, show login prompt
    if (!userDetails && currentStep > 1) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            To continue with your application, please log in or create an account.
            Your current progress has been saved locally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              Login to Continue
            </Button>
            <Button variant="outline" onClick={() => navigate('/signup')}>
              Create Account
            </Button>
          </div>
        </motion.div>
      );
    }
    
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep />;
      case 2:
        return <CompanyInfoStep />;
      case 3:
        return <CompanyBackgroundStep />;
      case 4:
        return <FundingBackgroundStep />;
      case 5:
        return <CompanyMarketsStep />;
      case 6:
        return <FinalDetailsStep />;
      case 7:
        return <DocumentUploadStep />;
      case 8:
        return <PaymentStep />;
      case 9:
        return <ReviewStep />;
      default:
        return <PersonalDetailsStep />;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <FormStepIndicator />
      
      <Card className="mt-8">
        <CardContent className="pt-6">
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
