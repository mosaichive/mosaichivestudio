import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ScrollAnimations from '@/components/ScrollAnimations';
import { submitLeadNotification } from '@/lib/leadNotifications';

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  serviceType: z.string().min(1, "Please select a specific service"),
  budget: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide some details about your project"),
  startDate: z.string().optional(),
});

// Main service categories
const servicesOptions = [
  { value: "graphic-design", label: "Graphic Design" },
  { value: "video-editing", label: "Video Editing" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "photography", label: "Photography" },
  { value: "web-design", label: "Web Design" },
];

// Service type options for each service category
const serviceTypeOptions = {
  "graphic-design": [
    { value: "brand-identity", label: "Brand Identity" },
    { value: "logo-design", label: "Logo Design" },
    { value: "print-design", label: "Print Design" },
    { value: "packaging", label: "Packaging Design" },
    { value: "illustration", label: "Custom Illustration" },
  ],
  "video-editing": [
    { value: "commercial", label: "Commercial Video" },
    { value: "motion-graphics", label: "Motion Graphics" },
    { value: "social-content", label: "Social Media Content" },
    { value: "promotional", label: "Promotional Video" },
    { value: "event-video", label: "Event Video" },
  ],
  "digital-marketing": [
    { value: "social-media", label: "Social Media Management" },
    { value: "content-creation", label: "Content Creation" },
    { value: "seo-services", label: "SEO Services" },
    { value: "ppc-campaigns", label: "PPC Campaigns" },
    { value: "email-marketing", label: "Email Marketing" },
  ],
  "photography": [
    { value: "product", label: "Product Photography" },
    { value: "corporate", label: "Corporate Photography" },
    { value: "event", label: "Event Photography" },
    { value: "portrait", label: "Portrait Photography" },
    { value: "real-estate", label: "Real Estate Photography" },
  ],
  "web-design": [
    { value: "landing-page", label: "Landing Page" },
    { value: "ecommerce", label: "E-Commerce Website" },
    { value: "corporate-site", label: "Corporate Website" },
    { value: "wordpress", label: "WordPress Website" },
    { value: "web-app", label: "Web Application" },
  ]
};

const getOptionLabel = (options: { value: string; label: string }[], value?: string) =>
  options.find((option) => option.value === value)?.label ?? value ?? '';

const GetStartedPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      serviceType: "",
      budget: "",
      projectDetails: "",
      startDate: "",
    },
  });

  const selectedService = form.watch('service');

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const serviceLabel = getOptionLabel(servicesOptions, data.service);
      const serviceTypeLabel = getOptionLabel(
        serviceTypeOptions[data.service as keyof typeof serviceTypeOptions] ?? [],
        data.serviceType
      );
      const legacyServiceRequest = {
        ...data,
        service: serviceLabel,
        serviceType: serviceTypeLabel,
      };

      await submitLeadNotification({
        formName: 'Service request',
        source: 'get-started',
        contact: {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
        },
        fields: {
          'Service category': serviceLabel,
          'Specific service': serviceTypeLabel,
          'Budget range': data.budget || 'Not provided',
          'Preferred start date': data.startDate || 'Not provided',
          'Project details': data.projectDetails,
        },
        legacyServiceRequest,
      });

      toast({
        title: "Request Submitted",
        description: "We've received your project request and will be in touch soon!",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      const message = error instanceof Error ? error.message : "There was a problem submitting your request. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ScrollAnimations />
      <Navbar />
      
      <div className="pt-28 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16 text-center" data-animate="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Request Our Services</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Fill out the form below to request our services and we'll get back to you within 24 hours to discuss your project needs.
          </p>
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {servicesOptions.map((service) => (
              <div 
                key={service.value} 
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center w-64 hover:shadow-xl transition-all cursor-pointer"
                onClick={() => form.setValue('service', service.value)}
              >
                <h3 className="font-bold text-lg mb-2">{service.label}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Professional {service.label.toLowerCase()} services for your brand</p>
                <Button 
                  className="mt-4 bg-gradient-to-r from-mosaic-primary to-mosaic-secondary text-white"
                  onClick={() => {
                    form.setValue('service', service.value);
                    // Scroll to form
                    document.getElementById('service-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Select
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4" id="service-form">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8" data-animate="scale-in">
              <h2 className="text-2xl font-bold mb-6">Complete Your Request</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
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
                            <Input placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Service Category</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              form.setValue('serviceType', ''); // Reset service type when service changes
                            }} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {servicesOptions.map((service) => (
                                <SelectItem key={service.value} value={service.value}>
                                  {service.label}
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
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Service</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                            disabled={!selectedService}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={selectedService ? "Select a specific service" : "Select a service category first"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedService && serviceTypeOptions[selectedService as keyof typeof serviceTypeOptions]?.map((serviceType) => (
                                <SelectItem key={serviceType.value} value={serviceType.value}>
                                  {serviceType.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget Range (Optional)</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select your budget" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="under-1000">Under $1,000</SelectItem>
                              <SelectItem value="1000-3000">$1,000 - $3,000</SelectItem>
                              <SelectItem value="3000-5000">$3,000 - $5,000</SelectItem>
                              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                              <SelectItem value="over-10000">Over $10,000</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Preferred Start Date (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input 
                                type="date"
                                {...field}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project needs, goals, and timeline..." 
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-mosaic-primary to-mosaic-secondary text-white hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Info Section */}
            <div className="lg:col-span-4" data-animate="fade-up">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-8">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "Expert team with years of experience",
                    "Tailored solutions for your unique needs",
                    "Transparent pricing with no hidden fees",
                    "Quick turnaround times",
                    "Unlimited revisions for your satisfaction",
                    "Post-project support and maintenance"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-mosaic-primary mt-1 flex-shrink-0" size={16} />
                      <span className="dark:text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold mb-4">What Happens Next</h3>
                <ol className="space-y-6">
                  {[
                    {
                      title: "Submission",
                      description: "Complete and submit the form with your project details."
                    },
                    {
                      title: "Consultation",
                      description: "Our team will contact you within 24 hours to discuss your needs."
                    },
                    {
                      title: "Proposal",
                      description: "We'll prepare a detailed proposal with timeline and pricing."
                    },
                    {
                      title: "Kickoff",
                      description: "Once approved, we'll start working on your project right away."
                    }
                  ].map((step, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="bg-mosaic-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold">{step.title}</h4>
                        <p className="dark:text-gray-300">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default GetStartedPage;
