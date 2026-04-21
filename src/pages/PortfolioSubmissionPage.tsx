
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';

// Define portfolio form schema
const portfolioFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  portfolioType: z.enum(["link", "file"], {
    required_error: "Please select how you want to submit your portfolio",
  }),
  portfolioLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  portfolioFile: z.instanceof(FileList).optional(),
  specialization: z.string().min(1, { message: "Please select at least one area of specialization" }),
  experience: z.string().min(1, { message: "Please select your experience level" }),
  message: z.string().min(50, { message: "Please tell us more about your work (minimum 50 characters)" }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  })
}).refine(
  (data) => {
    if (data.portfolioType === "link") return !!data.portfolioLink;
    if (data.portfolioType === "file") return !!data.portfolioFile && data.portfolioFile.length > 0;
    return false;
  },
  {
    message: "Please provide either a portfolio link or upload portfolio files",
    path: ["portfolioLink"],
  }
);

const specializationOptions = [
  "Graphic Design",
  "UI/UX Design",
  "Photography",
  "Illustration",
  "Motion Graphics",
  "Web Development",
  "Marketing",
  "Content Creation",
  "Branding",
  "Other"
];

const experienceLevels = [
  { value: "beginner", label: "Beginner (0-2 years)" },
  { value: "intermediate", label: "Intermediate (2-5 years)" },
  { value: "experienced", label: "Experienced (5-10 years)" },
  { value: "senior", label: "Senior (10+ years)" }
];

const PortfolioSubmissionPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      portfolioType: "link",
      portfolioLink: "",
      specialization: "",
      experience: "",
      message: "",
      termsAccepted: false,
    },
  });

  const portfolioType = form.watch("portfolioType");

  const onSubmit = (data: z.infer<typeof portfolioFormSchema>) => {
    console.log("Form submitted:", data);
    
    // In a real application, you would handle the file upload and form submission here
    // For now, we'll just show a success message
    toast({
      title: "Portfolio Submitted",
      description: "Thank you for sharing your portfolio with us. We'll review it and get back to you soon!",
    });

    // Reset form
    form.reset();
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center" data-animate="fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your Portfolio</h1>
              <p className="text-xl text-gray-300 mb-8">
                Share your creative work with us and explore opportunities for collaboration.
              </p>
              <div className="flex justify-center space-x-2">
                <div className="h-1 w-16 bg-gray-500 rounded-full"></div>
                <div className="h-1 w-4 bg-gray-500 rounded-full"></div>
                <div className="h-1 w-2 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Submission Form */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="you@example.com" {...field} />
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
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+233 XX XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="portfolioType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>How would you like to submit your portfolio?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="link" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Portfolio URL (Website, Behance, Dribbble, etc.)
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="file" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Upload Portfolio Files
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {portfolioType === "link" && (
                      <FormField
                        control={form.control}
                        name="portfolioLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Portfolio URL</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://your-portfolio-website.com" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Enter the URL where we can view your portfolio (e.g., personal website, Behance, Dribbble)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    {portfolioType === "file" && (
                      <FormField
                        control={form.control}
                        name="portfolioFile"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Portfolio Files</FormLabel>
                            <FormControl>
                              <Input 
                                type="file" 
                                accept=".pdf,.zip,.jpg,.jpeg,.png" 
                                multiple
                                onChange={(e) => onChange(e.target.files)}
                                {...rest}
                              />
                            </FormControl>
                            <FormDescription>
                              Upload your portfolio (PDF or compressed folder, max 25MB)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="specialization"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area of Specialization</FormLabel>
                          <FormControl>
                            <select
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              {...field}
                            >
                              <option value="">Select your specialization</option>
                              {specializationOptions.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {experienceLevels.map((level) => (
                                <FormItem key={level.value} className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={level.value} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {level.label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell us about your work</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Share information about your creative style, past projects, and what you hope to achieve by working with us..." 
                              className="min-h-[150px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree that Mosaic06 Studio may review my portfolio and contact me regarding opportunities
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-700">
                      Submit Portfolio
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PortfolioSubmissionPage;
