import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import {
  Globe,
  Smartphone,
  Layers,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Clock,
  FileText,
  Zap,
  Target,
  Calendar,
  Server,
  Download,
  Mail,
  Building2,
  ShoppingCart,
  CalendarCheck,
  HelpCircle,
  User,
  Shield,
  CreditCard,
  Bell,
  Search,
  BarChart3,
  MessageCircle,
  Puzzle,
  Brain,
  Languages,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import {
  projectTypes,
  projectPurposes,
  features,
  planningDepths,
  regionPricing,
  hostingTiers,
  calculateComplexityLevel,
  calculateEstimation,
  getTechStackRecommendation,
} from "@/lib/estimation-data";
import type { EstimationResult } from "@shared/schema";

const projectTypeIcons: Record<string, typeof Globe> = {
  globe: Globe,
  smartphone: Smartphone,
  layers: Layers,
};

const purposeIcons: Record<string, typeof Building2> = {
  business_tool: Building2,
  saas: Sparkles,
  marketplace: ShoppingCart,
  booking: CalendarCheck,
  not_sure: HelpCircle,
};

const featureIcons: Record<string, typeof User> = {
  auth: User,
  admin: Shield,
  payments: CreditCard,
  notifications: Bell,
  search: Search,
  analytics: BarChart3,
  chat: MessageCircle,
  api_integrations: Puzzle,
  ai: Brain,
  multilang: Languages,
};

interface WizardState {
  projectType: string;
  projectPurpose: string;
  selectedFeatures: string[];
  planningDepth: string;
  name: string;
  email: string;
}

const TOTAL_STEPS = 7;

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [estimation, setEstimation] = useState<EstimationResult | null>(null);
  const [regionData, setRegionData] = useState(regionPricing.find(r => r.region === 'DEFAULT')!);
  const { toast } = useToast();

  const [wizardState, setWizardState] = useState<WizardState>({
    projectType: '',
    projectPurpose: '',
    selectedFeatures: [],
    planningDepth: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    detectRegion();
    trackEvent('Estimation', 'Tool Started', 'Step 1');
  }, []);

  const detectRegion = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('https://ipapi.co/json/', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.log('Region detection failed, using default USD pricing');
        return;
      }
      
      const data = await response.json();
      const countryCode = data.country_code;
      
      if (!countryCode) {
        console.log('No country code returned, using default USD pricing');
        return;
      }
      
      let region = regionPricing.find(r => r.region === countryCode);
      if (!region) {
        const euCountries = ['DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH', 'PL', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT'];
        if (euCountries.includes(countryCode)) {
          region = regionPricing.find(r => r.region === 'EU');
        }
      }
      if (region) {
        setRegionData(region);
      }
    } catch (error) {
      console.log('Region detection failed, using default USD pricing');
    }
  };

  interface EstimateSubmission {
    projectType: string;
    projectPurpose: string;
    features: string;
    planningDepth: string;
    complexityLevel: string;
    estimationData: string;
    region: string;
    currency: string;
    name: string;
    email: string;
  }

  const submitMutation = useMutation({
    mutationFn: async (data: EstimateSubmission) => {
      return apiRequest('POST', '/api/estimate', data);
    },
    onSuccess: () => {
      toast({
        title: "Thank you for sharing your idea with us",
        description: "Our team will carefully review your requirements and get back to you within 24 hours.",
      });
      trackEvent('Estimation', 'Completed', wizardState.projectType);
    },
    onError: (error: Error) => {
      console.error('Estimation submission error:', error);
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const updateState = (key: keyof WizardState, value: any) => {
    setWizardState(prev => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (featureId: string) => {
    setWizardState(prev => ({
      ...prev,
      selectedFeatures: prev.selectedFeatures.includes(featureId)
        ? prev.selectedFeatures.filter(f => f !== featureId)
        : [...prev.selectedFeatures, featureId],
    }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return !!wizardState.projectType;
      case 2: return !!wizardState.projectPurpose;
      case 3: return wizardState.selectedFeatures.length > 0;
      case 4: return !!wizardState.planningDepth;
      case 5: return true;
      case 6: return true;
      case 7: return !!wizardState.name && !!wizardState.email && wizardState.email.includes('@');
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    
    trackEvent('Estimation', 'Step Completed', `Step ${currentStep}`);
    
    if (currentStep === 4) {
      generateEstimation();
    }
    
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateEstimation = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const complexity = calculateComplexityLevel(wizardState.selectedFeatures);
      const { milestones, totalDuration, totalCost } = calculateEstimation(
        wizardState.projectType,
        wizardState.projectPurpose,
        wizardState.selectedFeatures,
        wizardState.planningDepth,
        regionData.multiplier
      );
      
      const techStack = getTechStackRecommendation(wizardState.projectType, wizardState.selectedFeatures);
      
      const adjustedHosting = hostingTiers.map(tier => ({
        tier: tier.tier,
        monthly: {
          min: Math.round(tier.monthly.min * regionData.multiplier),
          max: Math.round(tier.monthly.max * regionData.multiplier),
        },
        description: tier.description,
      }));
      
      setEstimation({
        projectType: projectTypes.find(p => p.id === wizardState.projectType)?.name || '',
        projectPurpose: projectPurposes.find(p => p.id === wizardState.projectPurpose)?.name || '',
        features: wizardState.selectedFeatures.map(f => features.find(feat => feat.id === f)?.name || f),
        complexityLevel: complexity,
        planningDepth: wizardState.planningDepth,
        milestones,
        totalDuration,
        totalCost,
        hostingCosts: adjustedHosting,
        techStackRecommendation: techStack,
        currency: regionData.currency,
        currencySymbol: regionData.currencySymbol,
      });
      
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!estimation) return;
    
    if (!wizardState.name.trim() || wizardState.name.length < 2) {
      toast({
        title: "Please enter your name",
        description: "Your name is required to generate the estimation.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(wizardState.email)) {
      toast({
        title: "Please enter a valid email",
        description: "A valid email address is required to receive your estimation.",
        variant: "destructive",
      });
      return;
    }
    
    submitMutation.mutate({
      projectType: wizardState.projectType,
      projectPurpose: wizardState.projectPurpose,
      features: JSON.stringify(wizardState.selectedFeatures),
      planningDepth: wizardState.planningDepth,
      complexityLevel: estimation.complexityLevel,
      estimationData: JSON.stringify(estimation),
      region: regionData.region,
      currency: regionData.currency,
      name: wizardState.name.trim(),
      email: wizardState.email.trim().toLowerCase(),
    });
  };

  const progressPercent = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <span className="text-sm text-muted-foreground">
              Step {currentStep} of {TOTAL_STEPS}
            </span>
          </div>
          <Progress value={progressPercent} className="h-1" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepContainer key="step1">
              <StepHeader
                title="What are you building?"
                subtitle="This helps us understand your vision. There's no wrong choice here."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projectTypes.map((type) => {
                  const Icon = projectTypeIcons[type.icon];
                  return (
                    <SelectionCard
                      key={type.id}
                      selected={wizardState.projectType === type.id}
                      onClick={() => updateState('projectType', type.id)}
                      testId={`card-project-type-${type.id}`}
                    >
                      <Icon className="h-8 w-8 mb-4 text-foreground" />
                      <h3 className="font-semibold mb-2">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </SelectionCard>
                  );
                })}
              </div>
            </StepContainer>
          )}

          {currentStep === 2 && (
            <StepContainer key="step2">
              <StepHeader
                title="What's the purpose?"
                subtitle="Help us understand your goals. You're not expected to know everything yet."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projectPurposes.map((purpose) => {
                  const Icon = purposeIcons[purpose.id];
                  return (
                    <SelectionCard
                      key={purpose.id}
                      selected={wizardState.projectPurpose === purpose.id}
                      onClick={() => updateState('projectPurpose', purpose.id)}
                      testId={`card-purpose-${purpose.id}`}
                    >
                      <Icon className="h-6 w-6 mb-3 text-foreground" />
                      <h3 className="font-semibold mb-1">{purpose.name}</h3>
                      <p className="text-sm text-muted-foreground">{purpose.description}</p>
                    </SelectionCard>
                  );
                })}
              </div>
            </StepContainer>
          )}

          {currentStep === 3 && (
            <StepContainer key="step3">
              <StepHeader
                title="Which features matter most?"
                subtitle="Select the features that are important to you. We can always refine these later."
              />
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Common Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {features.filter(f => f.category === 'common').map((feature) => {
                      const Icon = featureIcons[feature.id];
                      return (
                        <FeatureCard
                          key={feature.id}
                          feature={feature}
                          Icon={Icon}
                          selected={wizardState.selectedFeatures.includes(feature.id)}
                          onClick={() => toggleFeature(feature.id)}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Advanced Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {features.filter(f => f.category === 'advanced').map((feature) => {
                      const Icon = featureIcons[feature.id];
                      return (
                        <FeatureCard
                          key={feature.id}
                          feature={feature}
                          Icon={Icon}
                          selected={wizardState.selectedFeatures.includes(feature.id)}
                          onClick={() => toggleFeature(feature.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </StepContainer>
          )}

          {currentStep === 4 && (
            <StepContainer key="step4">
              <StepHeader
                title="How detailed should we plan?"
                subtitle="Choose what feels right for you. We'll guide you if anything is unclear."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {planningDepths.map((depth) => (
                  <SelectionCard
                    key={depth.id}
                    selected={wizardState.planningDepth === depth.id}
                    onClick={() => updateState('planningDepth', depth.id)}
                    testId={`card-planning-${depth.id}`}
                    className="p-8"
                  >
                    {depth.id === 'quick' ? (
                      <Zap className="h-8 w-8 mb-4 text-foreground" />
                    ) : (
                      <Target className="h-8 w-8 mb-4 text-foreground" />
                    )}
                    <h3 className="text-xl font-semibold mb-2">{depth.name}</h3>
                    <p className="text-muted-foreground mb-4">{depth.description}</p>
                    <ul className="space-y-2">
                      {depth.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-4 w-4 text-foreground" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </SelectionCard>
                ))}
              </div>
            </StepContainer>
          )}

          {currentStep === 5 && (
            <StepContainer key="step5">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
                    <Sparkles className="h-8 w-8 text-foreground animate-pulse" />
                  </div>
                  <LoadingMessages />
                </div>
              ) : estimation && (
                <>
                  <StepHeader
                    title="We understood your vision"
                    subtitle="Here's what we captured. This gives us a clear direction."
                  />
                  <Card className="mb-8">
                    <CardContent className="p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Project Type</p>
                          <p className="font-semibold">{estimation.projectType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Purpose</p>
                          <p className="font-semibold">{estimation.projectPurpose}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Complexity</p>
                          <Badge variant={estimation.complexityLevel === 'complex' ? 'default' : 'secondary'}>
                            {estimation.complexityLevel.charAt(0).toUpperCase() + estimation.complexityLevel.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-3">Selected Features</p>
                        <div className="flex flex-wrap gap-2">
                          {estimation.features.map((feature) => (
                            <Badge key={feature} variant="outline">{feature}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <p className="text-center text-muted-foreground">
                    That's helpful for planning. Continue to see your estimation.
                  </p>
                </>
              )}
            </StepContainer>
          )}

          {currentStep === 6 && estimation && (
            <StepContainer key="step6">
              <StepHeader
                title="Your Personalized Estimation"
                subtitle="A milestone-based overview tailored to your requirements"
              />
              
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {estimation.milestones.map((milestone, index) => (
                        <div key={milestone.name} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-medium">
                                  {index + 1}
                                </span>
                                <h4 className="font-semibold">{milestone.name}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground ml-11">{milestone.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold">
                                {estimation.currencySymbol}{milestone.costRange.min.toLocaleString()} - {estimation.currencySymbol}{milestone.costRange.max.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {milestone.durationWeeks.min}-{milestone.durationWeeks.max} weeks
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <h4 className="font-semibold">Timeline Overview</h4>
                      </div>
                      <p className="text-2xl font-bold">
                        {estimation.totalDuration.min} - {estimation.totalDuration.max} weeks
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Estimated project duration</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <h4 className="font-semibold">Total Investment</h4>
                      </div>
                      <p className="text-2xl font-bold">
                        {estimation.currencySymbol}{estimation.totalCost.min.toLocaleString()} - {estimation.currencySymbol}{estimation.totalCost.max.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Estimated investment range</p>
                      <p className="text-xs text-muted-foreground mt-2">Custom features and add-ons are reviewed separately</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-semibold">Hosting & Infrastructure</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {estimation.hostingCosts.map((tier) => (
                        <div key={tier.tier} className="p-4 rounded-lg bg-muted/50">
                          <p className="font-medium mb-1">{tier.tier}</p>
                          <p className="text-lg font-semibold">
                            {estimation.currencySymbol}{tier.monthly.min} - {estimation.currencySymbol}{tier.monthly.max}/mo
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{tier.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {estimation.techStackRecommendation && estimation.techStackRecommendation.length > 0 && (
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-4">Recommended Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {estimation.techStackRecommendation.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </StepContainer>
          )}

          {currentStep === 7 && (
            <StepContainer key="step7">
              <StepHeader
                title="Receive Your Detailed Estimation"
                subtitle="Share your details and we'll send you a comprehensive overview"
              />
              <Card className="max-w-md mx-auto">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={wizardState.name}
                        onChange={(e) => updateState('name', e.target.value)}
                        data-testid="input-name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={wizardState.email}
                        onChange={(e) => updateState('email', e.target.value)}
                        data-testid="input-email"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-6"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitMutation.isPending}
                    data-testid="button-submit-estimation"
                  >
                    {submitMutation.isPending ? (
                      <>Preparing your estimation...</>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send My Estimation
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    We follow GDPR and HIPAA-aligned practices to protect your data.
                  </p>
                </CardContent>
              </Card>
            </StepContainer>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
            data-testid="button-back"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          {currentStep < TOTAL_STEPS && (
            <Button
              onClick={handleNext}
              disabled={!canProceed() || isLoading}
              data-testid="button-next"
            >
              Continue
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>

      <footer className="border-t border-border py-8 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          Prepared by Soni Consultancy Services
        </p>
      </footer>
    </div>
  );
}

function StepContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function SelectionCard({
  children,
  selected,
  onClick,
  testId,
  className = '',
}: {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  testId: string;
  className?: string;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-500 ease-out ${
        selected
          ? 'ring-2 ring-foreground bg-muted/50'
          : 'hover-elevate'
      } ${className}`}
      onClick={onClick}
      data-testid={testId}
    >
      <CardContent className="p-6 relative">
        {selected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <Check className="h-4 w-4 text-background" />
            </div>
          </div>
        )}
        {children}
      </CardContent>
    </Card>
  );
}

function FeatureCard({
  feature,
  Icon,
  selected,
  onClick,
}: {
  feature: { id: string; name: string; helperText: string; complexityWeight: number };
  Icon: typeof User;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={`cursor-pointer transition-all duration-500 ease-out ${
        selected ? 'ring-2 ring-foreground bg-muted/50' : 'hover-elevate'
      }`}
      onClick={onClick}
      data-testid={`card-feature-${feature.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            selected ? 'bg-foreground' : 'bg-muted'
          }`}>
            <Icon className={`h-5 w-5 ${selected ? 'text-background' : 'text-foreground'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm">{feature.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{feature.helperText}</p>
          </div>
          {selected && (
            <Check className="h-5 w-5 text-foreground flex-shrink-0" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingMessages() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Reviewing your inputs...",
    "Organizing your requirements...",
    "Calculating milestones...",
    "Preparing your estimation...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-lg text-muted-foreground">{messages[messageIndex]}</p>
  );
}
