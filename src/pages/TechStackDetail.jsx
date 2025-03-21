import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Database,
  Server,
  Code,
  ChevronRight,
  Globe,
  Layers,
  Cloud,
  Monitor,
  Brain,
  Network,
  Lock,
  LineChart,
  Terminal,
  Search,
  Zap,
  FileCode,
  Settings,
  Star,
  GithubIcon,
  ExternalLink,
  Info,
  BarChart2,
  BookOpen,
  Clock,
  Share2,
  Bookmark,
  Copy,
  Check,
  Edit,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";

// Icons mapping for technology categories
const categoryIcons = {
  frontend: <Monitor className="h-5 w-5" />,
  backend: <Server className="h-5 w-5" />,
  ai_ml: <Brain className="h-5 w-5" />,
  devops: <Settings className="h-5 w-5" />,
  infrastructure: <Cloud className="h-5 w-5" />,
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  ai_ml: "AI & ML",
  devops: "DevOps",
  infrastructure: "Infrastructure",
};

// Tech popularity/adoption data (simulated)
const techPopularity = {
  React: 92,
  Redux: 78,
  TypeScript: 86,
  "Node.js": 88,
  Java: 75,
  Python: 90,
  GraphQL: 72,
  Kubernetes: 85,
  Docker: 89,
  AWS: 94,
  MongoDB: 82,
  PostgreSQL: 87,
  "Ruby on Rails": 60,
  Go: 80,
  TensorFlow: 82,
  Kafka: 76,
  Redis: 84,
  MySQL: 83,
  "Next.js": 75,
  Express: 88,
  "React Native": 79,
  Swift: 72,
  Kotlin: 73,
  PHP: 62,
  "Spring Boot": 70,
  "Vue.js": 68,
};

// Get popularity or default to 65
const getTechPopularity = (name) => techPopularity[name] || 65;

// Expanded platform data with categorized technology stacks
const platformData = {
  ig: {
    name: "Instagram",
    description:
      "Instagram is a photo and video sharing social networking service owned by Meta Platforms that allows users to share moments, connect through stories, and discover content from around the world.",
    website: "https://about.instagram.com/",
    logo: "https://static.vecteezy.com/system/resources/previews/042/148/632/non_2x/instagram-logo-instagram-social-media-icon-free-png.png",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    accentColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    primaryColor: "blue",
    tech_stack: {
      frontend: [
        { name: "React", description: "Primary UI framework" },
        { name: "Redux", description: "State management" },
        { name: "React Native", description: "Mobile app development" },
        { name: "CSS ", description: "Styling framework" },
        { name: "WebPack", description: "Module bundling" },
      ],
      backend: [
        { name: "Django", description: "Python web framework" },
        { name: "Node.JS", description: "JavaScript runtime" },
        { name: "GraphQL", description: "Query language for APIs" },
        { name: "PostgreSQL", description: "Relational database" },
        { name: "Cassandra", description: "NoSQL database" },
      ],
      ai_ml: [
        { name: "PyTorch", description: "Machine learning framework" },
        { name: "TensorFlow", description: "Machine learning platform" },
        { name: "Apache Spark", description: "Data processing" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerization" },
        { name: "AWS", description: "Cloud infrastructure" },
      ],
      infrastructure: [
        { name: "Hadoop", description: "Distributed storage" },
        { name: "Memcached", description: "Distributed memory caching" },
        { name: "ZooKeeper", description: "Distributed coordination" },
      ],
    },
    open_source_projects: [
      { name: "React Native", url: "https://github.com/facebook/react-native" },
      { name: "IGListKit", url: "https://github.com/Instagram/IGListKit" },
      { name: "Cassandra", url: "https://github.com/apache/cassandra" },
    ],
    interesting_facts: [
      "Instagram processes over 95 million photos and videos daily",
      "Originally launched in 2010, it was acquired by Facebook (now Meta) in 2012",
      "Built using Python for server side and React Native for mobile apps",
    ],
  },
  netflix: {
    name: "Netflix",
    description:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    website: "https://netflix.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png",
    color: "bg-red-50",
    iconColor: "text-red-600",
    accentColor: "bg-gradient-to-r from-red-600 to-red-700",
    primaryColor: "red",
    tech_stack: {
      frontend: [
        { name: "React", description: "UI development" },
        { name: "JavaScript", description: "Core language" },
        { name: "RxJS", description: "Reactive programming" },
        { name: "GraphQL", description: "API queries" },
      ],
      backend: [
        { name: "Java", description: "Core backend services" },
        { name: "Node.js", description: "API middleware" },
        { name: "Spring Boot", description: "Java framework" },
        { name: "Kafka", description: "Stream processing" },
      ],
      ai_ml: [
        { name: "TensorFlow", description: "Recommendation systems" },
        { name: "Jupyter", description: "Data analysis" },
      ],
      devops: [
        { name: "Spinnaker", description: "Continuous delivery" },
        { name: "Chaos Monkey", description: "Resilience testing" },
        { name: "AWS", description: "Cloud infrastructure" },
        { name: "Docker", description: "Containerization" },
      ],
      infrastructure: [
        { name: "Hystrix", description: "Fault tolerance" },
        { name: "Cassandra", description: "Distributed database" },
        { name: "EVCache", description: "Distributed caching" },
      ],
    },
    open_source_projects: [
      { name: "Hystrix", url: "https://github.com/Netflix/Hystrix" },
      { name: "Conductor", url: "https://github.com/Netflix/conductor" },
      { name: "Spinnaker", url: "https://github.com/spinnaker/spinnaker" },
    ],
    interesting_facts: [
      "Netflix serves over 200 million subscribers in more than 190 countries",
      "They operate a microservices architecture with over 700 microservices",
      "Netflix pioneered chaos engineering with tools like Chaos Monkey",
    ],
  },
  spotify: {
    name: "Spotify",
    description:
      "Spotify is a digital music streaming service that gives users access to millions of songs, podcasts, and videos from artists all over the world.",
    website: "https://www.spotify.com/",
    logo: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
    color: "bg-green-50",
    iconColor: "text-green-600",
    accentColor: "bg-gradient-to-r from-green-500 to-green-600",
    primaryColor: "green",
    tech_stack: {
      frontend: [
        { name: "React", description: "Web application UI framework" },
        { name: "Redux", description: "State management" },
        { name: "TypeScript", description: "Static typing" },
        { name: "Styled Components", description: "Component styling" },
        { name: "Web Components", description: "Custom element creation" },
      ],
      backend: [
        { name: "Python", description: "Backend services" },
        { name: "Java", description: "Core service development" },
        { name: "Scala", description: "Data processing" },
        { name: "PostgreSQL", description: "Relational database" },
        { name: "gRPC", description: "Remote procedure calls" },
      ],
      ai_ml: [
        { name: "Apache Spark", description: "Big data processing" },
        { name: "TensorFlow", description: "Machine learning framework" },
        { name: "Luigi", description: "Workflow management" },
        { name: "Annoy", description: "Approximate nearest neighbors" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerization" },
        { name: "GCP", description: "Cloud infrastructure" },
        { name: "Terraform", description: "Infrastructure as code" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Cassandra", description: "NoSQL database" },
        { name: "Bigtable", description: "NoSQL database" },
        { name: "Memcached", description: "Caching layer" },
      ],
    },
    open_source_projects: [
      { name: "Backstage", url: "https://github.com/backstage/backstage" },
      { name: "Scio", url: "https://github.com/spotify/scio" },
      {
        name: "Docker Client",
        url: "https://github.com/spotify/docker-client",
      },
      { name: "Annoy", url: "https://github.com/spotify/annoy" },
    ],
    interesting_facts: [
      "Spotify has over 365 million monthly active users worldwide",
      "They use a microservice architecture with over 1000 services",
      "Spotify developed the 'Squad model' for agile development teams",
      "Their recommendation system processes over 100 terabytes of data daily",
    ],
  },
  uber: {
    name: "Uber",
    description:
      "Uber is a technology platform that connects riders with drivers through a mobile application, offering ride-hailing, food delivery, and freight transportation services.",
    website: "https://www.uber.com/",
    logo: "https://1000logos.net/wp-content/uploads/2017/09/Uber-logo.png",
    color: "bg-slate-50",
    iconColor: "text-slate-800",
    accentColor: "bg-gradient-to-r from-slate-800 to-slate-900",
    primaryColor: "slate",
    tech_stack: {
      frontend: [
        { name: "React", description: "Web application framework" },
        { name: "Swift", description: "iOS app development" },
        { name: "Kotlin", description: "Android app development" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Redux", description: "State management" },
        { name: "BaseUI", description: "Design system framework" },
      ],
      backend: [
        { name: "Go", description: "Core services" },
        { name: "Node.js", description: "API services" },
        { name: "Java", description: "Backend services" },
        { name: "Python", description: "Data processing" },
        { name: "MySQL", description: "Relational database" },
        { name: "Schemaless", description: "NoSQL storage" },
      ],
      ai_ml: [
        { name: "PyTorch", description: "Machine learning" },
        { name: "H3", description: "Geospatial indexing" },
        { name: "Horovod", description: "Distributed ML" },
        { name: "Michelangelo", description: "ML Platform (internal)" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerization" },
        { name: "Prometheus", description: "Monitoring" },
        { name: "Jaeger", description: "Distributed tracing" },
        { name: "Piper", description: "CI/CD (internal)" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Cassandra", description: "NoSQL database" },
        { name: "M3DB", description: "Metrics storage" },
        { name: "Redis", description: "Caching" },
      ],
    },
    open_source_projects: [
      { name: "Jaeger", url: "https://github.com/jaegertracing/jaeger" },
      { name: "H3", url: "https://github.com/uber/h3" },
      { name: "Horovod", url: "https://github.com/horovod/horovod" },
      { name: "M3DB", url: "https://github.com/m3db/m3" },
    ],
    interesting_facts: [
      "Uber operates in over 10,000 cities across 71 countries",
      "Their map system handles millions of GPS data points in real-time",
      "Uber processes over 41 million trips per day",
      "They run one of the largest Hadoop clusters in the world",
    ],
  },
  airbnb: {
    name: "Airbnb",
    description:
      "Airbnb is an online marketplace that connects people who want to rent out their homes with people looking for accommodations in specific locales.",
    website: "https://www.airbnb.com/",
    logo: "https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg",
    color: "bg-rose-50",
    iconColor: "text-rose-600",
    accentColor: "bg-gradient-to-r from-rose-500 to-rose-600",
    primaryColor: "rose",
    tech_stack: {
      frontend: [
        { name: "React", description: "UI framework" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Redux", description: "State management" },
        { name: "React Native", description: "Mobile development" },
        { name: "DLS", description: "Design language system" },
        { name: "Hypernova", description: "Server-side rendering" },
      ],
      backend: [
        { name: "Ruby on Rails", description: "Web framework" },
        { name: "Java", description: "Service framework" },
        { name: "Kotlin", description: "Microservices" },
        { name: "GraphQL", description: "API querying" },
        { name: "MySQL", description: "Relational database" },
        { name: "Thrift", description: "RPC framework" },
      ],
      ai_ml: [
        { name: "TensorFlow", description: "Machine learning" },
        { name: "Airflow", description: "Workflow management" },
        { name: "Aerosolve", description: "ML framework" },
        { name: "BigHead", description: "ML Platform (internal)" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Chef", description: "Configuration management" },
        { name: "AWS", description: "Cloud infrastructure" },
        { name: "DataDog", description: "Monitoring" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Druid", description: "Analytics database" },
        { name: "Redis", description: "Caching" },
        { name: "HBase", description: "NoSQL database" },
      ],
    },
    open_source_projects: [
      { name: "Airflow", url: "https://github.com/apache/airflow" },
      { name: "Hypernova", url: "https://github.com/airbnb/hypernova" },
      { name: "Lottie", url: "https://github.com/airbnb/lottie-web" },
      { name: "Aerosolve", url: "https://github.com/airbnb/aerosolve" },
    ],
    interesting_facts: [
      "Airbnb lists over 7 million accommodations worldwide",
      "They manage a cross-platform design system called DLS (Design Language System)",
      "Airbnb pioneered the use of React Native in a large-scale production environment",
      "They process and analyze over 50TB of data daily",
    ],
  },
  slack: {
    name: "Slack",
    description:
      "Slack is a business communication platform that offers many IRC-style features including persistent chat rooms organized by topic, private groups, and direct messaging.",
    website: "https://slack.com/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    accentColor: "bg-gradient-to-r from-purple-500 to-purple-600",
    primaryColor: "purple",
    tech_stack: {
      frontend: [
        { name: "React", description: "UI framework" },
        { name: "Redux", description: "State management" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Electron", description: "Desktop applications" },
        { name: "CSS Modules", description: "Styling architecture" },
        { name: "React Native", description: "Mobile development" },
      ],
      backend: [
        { name: "Java", description: "Core services" },
        { name: "PHP", description: "Web framework" },
        { name: "Hack", description: "HHVM language" },
        { name: "GraphQL", description: "API layer" },
        { name: "MySQL", description: "Relational database" },
        { name: "Vitess", description: "Database scaling" },
      ],
      ai_ml: [
        { name: "PyTorch", description: "Machine learning" },
        { name: "Elastic Search", description: "Search engine" },
        { name: "TensorFlow", description: "Natural language processing" },
        { name: "Presto", description: "Distributed SQL engine" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerization" },
        { name: "AWS", description: "Cloud infrastructure" },
        { name: "Terraform", description: "Infrastructure as code" },
        { name: "ELK Stack", description: "Logging and monitoring" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Redis", description: "Caching" },
        { name: "Consul", description: "Service discovery" },
        { name: "Memcached", description: "Distributed caching" },
      ],
    },
    open_source_projects: [
      { name: "Slack Kit", url: "https://github.com/slackapi/slack-kit" },
      {
        name: "Slack API Documentation",
        url: "https://github.com/slackapi/slack-api-docs",
      },
      {
        name: "Incoming Webhooks",
        url: "https://github.com/slackapi/node-slack-sdk",
      },
      {
        name: "Bolt for JavaScript",
        url: "https://github.com/slackapi/bolt-js",
      },
    ],
    interesting_facts: [
      "Slack has over 12 million daily active users",
      "The name 'Slack' stands for 'Searchable Log of All Conversation and Knowledge'",
      "They successfully migrated all users from IRC-like infrastructure to a more modern WebSocket-based system without service interruption",
      "Slack indexes over 10 billion messages for search capabilities",
    ],
  },
  stripe: {
    name: "Stripe",
    description:
      "Stripe is a technology company that builds economic infrastructure for the internet, allowing businesses to accept payments and manage their businesses online.",
    website: "https://stripe.com/",
    logo: "https://yt3.googleusercontent.com/ytc/APkrFKb5bcmery3bDjC14Z4f5n5VjBqFRJBYjet1-G-=s900-c-k-c0x00ffffff-no-rj",
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    accentColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    primaryColor: "indigo",
    tech_stack: {
      frontend: [
        { name: "React", description: "UI framework" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Flow", description: "Static type checker" },
        { name: "Redux", description: "State management" },
        { name: "Styled Components", description: "Component styling" },
        { name: "Flexbox", description: "Layout system" },
      ],
      backend: [
        { name: "Ruby", description: "Application development" },
        { name: "Go", description: "Microservices" },
        { name: "Scala", description: "Data processing" },
        { name: "GraphQL", description: "API layer" },
        { name: "PostgreSQL", description: "Relational database" },
        { name: "Sorbet", description: "Ruby type checker" },
      ],
      ai_ml: [
        { name: "TensorFlow", description: "Machine learning" },
        { name: "Spark", description: "Data processing" },
        { name: "Radar", description: "Fraud detection (internal)" },
        { name: "PySpark", description: "Data analytics" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Docker", description: "Containerization" },
        { name: "AWS", description: "Cloud infrastructure" },
        { name: "Terraform", description: "Infrastructure as code" },
        { name: "Datadog", description: "Monitoring" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Redis", description: "Caching" },
        { name: "Consul", description: "Service discovery" },
        { name: "Vault", description: "Secrets management" },
        { name: "Bazel", description: "Build system" },
      ],
    },
    open_source_projects: [
      { name: "Sorbet", url: "https://github.com/sorbet/sorbet" },
      { name: "Stripe CLI", url: "https://github.com/stripe/stripe-cli" },
      {
        name: "React Stripe.js",
        url: "https://github.com/stripe/react-stripe-js",
      },
      { name: "Stripe Node.js", url: "https://github.com/stripe/stripe-node" },
    ],
    interesting_facts: [
      "Stripe processes billions of dollars annually for businesses worldwide",
      "They support payments in over 135 currencies and payout methods in 45+ countries",
      "Their codebase is primarily written in Ruby, increasing from 30k lines to over 3.7 million lines",
      "Stripe invests heavily in developer tools and has over 250 public repositories on GitHub",
    ],
  },
  twitter: {
    name: "Twitter",
    description:
      'Twitter is a microblogging and social networking service where users post and interact with messages known as "tweets".',
    website: "https://twitter.com/",
    logo: "https://seeklogo.com/images/T/twitter-x-logo-0339F999CF-seeklogo.com.png?v=638264860150000000",
    color: "bg-sky-50",
    iconColor: "text-sky-600",
    accentColor: "bg-gradient-to-r from-sky-500 to-sky-600",
    primaryColor: "sky",
    tech_stack: {
      frontend: [
        { name: "React", description: "UI framework" },
        { name: "TypeScript", description: "Type safety" },
        { name: "Redux", description: "State management" },
        { name: "Scala.js", description: "Scala to JavaScript compiler" },
        { name: "CSS Modules", description: "Styling architecture" },
        { name: "NextJS", description: "Server-side rendering" },
      ],
      backend: [
        { name: "Scala", description: "Service framework" },
        { name: "Java", description: "Backend services" },
        { name: "Ruby on Rails", description: "Web framework" },
        { name: "Finagle", description: "RPC system" },
        { name: "MySQL", description: "Relational database" },
        { name: "Manhattan", description: "NoSQL data store (internal)" },
      ],
      ai_ml: [
        { name: "TensorFlow", description: "Machine learning" },
        { name: "Torch", description: "Deep learning" },
        { name: "Spark", description: "Data processing" },
        { name: "DeepBird", description: "ML Platform (internal)" },
        { name: "Heron", description: "Stream processing" },
      ],
      devops: [
        { name: "Kubernetes", description: "Container orchestration" },
        { name: "Mesos", description: "Resource management" },
        { name: "Aurora", description: "Cluster management" },
        { name: "Jenkins", description: "CI/CD" },
        { name: "Prometheus", description: "Monitoring" },
      ],
      infrastructure: [
        { name: "Kafka", description: "Event streaming" },
        { name: "Redis", description: "Caching" },
        { name: "ZooKeeper", description: "Coordination service" },
        { name: "RocksDB", description: "Storage engine" },
        { name: "Hadoop", description: "Distributed storage" },
      ],
    },
    open_source_projects: [
      { name: "Finagle", url: "https://github.com/twitter/finagle" },
      { name: "Heron", url: "https://github.com/apache/incubator-heron" },
      { name: "Twemoji", url: "https://github.com/twitter/twemoji" },
      { name: "Twitter Text", url: "https://github.com/twitter/twitter-text" },
    ],
    interesting_facts: [
      "Twitter processes over 500 million tweets per day",
      "They operate one of the world's largest Hadoop clusters for analytics",
      "Their Finagle RPC framework processes over 20 million requests per second",
      "Twitter's Manhattan database handles over 300 million queries per second",
    ],
  },
};

const TechStackDetail = () => {
  const { platformId } = useParams();
  const platform = platformData[platformId];
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(false);
  const [techCount, setTechCount] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newValue = prev + 10;
        if (newValue >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newValue;
      });
    }, 100);

    // Count total technologies
    if (platform) {
      const count = Object.values(platform.tech_stack).reduce(
        (sum, techs) => sum + techs.length,
        0
      );
      setTechCount(count);
    }

    return () => clearInterval(interval);
  }, [platform]);

  if (!platform) {
    return (
      <Layout>
        <div className="container px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Platform not found</h1>
          <p>
            The tech stack you're looking for doesn't exist or isn't available
            yet.
          </p>
          <Link
            to="/techstacks"
            className="mt-6 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            View All Tech Stacks
          </Link>
        </div>
      </Layout>
    );
  }

  // Fix for dynamic tailwind classes - pre-defining all possible classes
  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        hover: "hover:bg-blue-200",
        border: "border-blue-600",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-800",
        gradient: "from-blue-500 to-blue-700",
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        hover: "hover:bg-red-200",
        border: "border-red-600",
        badgeBg: "bg-red-100",
        badgeText: "text-red-800",
        gradient: "from-red-500 to-red-700",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        hover: "hover:bg-green-200",
        border: "border-green-600",
        badgeBg: "bg-green-100",
        badgeText: "text-green-800",
        gradient: "from-green-500 to-green-700",
      },
      slate: {
        bg: "bg-slate-50",
        text: "text-slate-600",
        hover: "hover:bg-slate-200",
        border: "border-slate-600",
        badgeBg: "bg-slate-100",
        badgeText: "text-slate-800",
        gradient: "from-slate-600 to-slate-800",
      },
      rose: {
        bg: "bg-rose-50",
        text: "text-rose-600",
        hover: "hover:bg-rose-200",
        border: "border-rose-600",
        badgeBg: "bg-rose-100",
        badgeText: "text-rose-800",
        gradient: "from-rose-500 to-rose-700",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        hover: "hover:bg-purple-200",
        border: "border-purple-600",
        badgeBg: "bg-purple-100",
        badgeText: "text-purple-800",
        gradient: "from-purple-500 to-purple-700",
      },
      indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
        hover: "hover:bg-indigo-200",
        border: "border-indigo-600",
        badgeBg: "bg-indigo-100",
        badgeText: "text-indigo-800",
        gradient: "from-indigo-500 to-indigo-700",
      },
      sky: {
        bg: "bg-sky-50",
        text: "text-sky-600",
        hover: "hover:bg-sky-200",
        border: "border-sky-600",
        badgeBg: "bg-sky-100",
        badgeText: "text-sky-800",
        gradient: "from-sky-500 to-sky-700",
      },
    };

    return colorMap[color] || colorMap.blue;
  };

  const colorClasses = getColorClasses(platform.primaryColor);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const copyToClipboard = () => {
    const techStackText = Object.entries(platform.tech_stack)
      .map(([category, techs]) => {
        return `${categoryLabels[category]}: ${techs
          .map((t) => t.name)
          .join(", ")}`;
      })
      .join("\n");

    navigator.clipboard.writeText(
      `${platform.name} Tech Stack\n\n${techStackText}`
    );
    setCopied(true);
    toast.success("Tech stack copied to clipboard!");

    setTimeout(() => setCopied(false), 2000);
  };

  // Filter techs by category
  const filteredTechs =
    selectedCategory === "all"
      ? Object.entries(platform.tech_stack)
      : Object.entries(platform.tech_stack).filter(
          ([category]) => category === selectedCategory
        );

  return (
    <Layout>
      {/* Hero Section with Platform Info */}
      <div className={`${platform.color} border-b relative overflow-hidden`}>
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${colorClasses.gradient} blur-3xl`}
          ></div>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr ${colorClasses.gradient} blur-3xl`}
          ></div>
        </div>

        <div className="container px-4 md:px-6 py-12 mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-xl border transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src={platform.logo}
                alt={`${platform.name} logo`}
                className="h-24 w-auto object-contain"
              />
            </div>
            <div className="md:flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                <Badge
                  variant="outline"
                  className={`${colorClasses.border} ${colorClasses.text} mr-2 uppercase text-xs`}
                >
                  Tech Stack
                </Badge>
                <div className="flex items-center">
                  <Star
                    className="h-4 w-4 text-amber-400 mr-1"
                    fill="currentColor"
                  />
                  <span className="text-sm text-gray-600">
                    Popular Platform
                  </span>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                {platform.name} Tech Stack
              </h1>
              <p className="text-gray-700 max-w-2xl text-lg">
                {platform.description}
              </p>
              <div className="flex items-center justify-center md:justify-start mt-4 space-x-3">
                <a
                  href={platform.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center px-4 py-2 rounded-lg ${platform.accentColor} text-white hover:opacity-90 transition-opacity`}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Tech Stack Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div
              className={`p-4 rounded-lg bg-white shadow-sm border ${colorClasses.border} text-center`}
            >
              <p className="text-sm text-gray-500">Technologies</p>
              <h3 className="text-2xl font-bold">{techCount}</h3>
            </div>
            <div
              className={`p-4 rounded-lg bg-white shadow-sm border ${colorClasses.border} text-center`}
            >
              <p className="text-sm text-gray-500">Categories</p>
              <h3 className="text-2xl font-bold">
                {Object.keys(platform.tech_stack).length}
              </h3>
            </div>
            <div
              className={`p-4 rounded-lg bg-white shadow-sm border ${colorClasses.border} text-center`}
            >
              <p className="text-sm text-gray-500">Open Source</p>
              <h3 className="text-2xl font-bold">
                {platform.open_source_projects?.length || 0}
              </h3>
            </div>
            <div
              className={`p-4 rounded-lg bg-white shadow-sm border ${colorClasses.border} text-center`}
            >
              <p className="text-sm text-gray-500">Interesting Facts</p>
              <h3 className="text-2xl font-bold">
                {platform.interesting_facts?.length || 0}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-8 mx-auto max-w-7xl">
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b mb-6">
            <TabsList className="bg-transparent h-auto p-0 mb-0 w-full flex justify-start overflow-x-auto">
              {[
                "overview",
                "tech-stack",
                "open-source",
                "facts",
                "compare",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className={`px-4 py-2 rounded-none border-b-2 border-transparent transition-colors ${
                    activeTab === tab
                      ? `${colorClasses.border} ${colorClasses.text}`
                      : ""
                  }`}
                >
                  {tab === "compare"
                    ? "Comparison"
                    : tab.charAt(0).toUpperCase() +
                      tab.slice(1).replace("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-0">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card className={`${platform.color} border shadow-lg h-full`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3 shadow-md`}
                      >
                        <Server className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-bold">Technology Overview</h3>
                    </div>

                    <div className="space-y-5">
                      {Object.entries(platform.tech_stack).map(
                        ([category, technologies]) => (
                          <div key={category} className="flex flex-col">
                            <div className="flex items-center mb-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${colorClasses.badgeBg} ${colorClasses.badgeText} mr-2`}
                              >
                                {categoryIcons[category]}
                              </div>
                              <h4
                                className={`font-semibold ${colorClasses.text}`}
                              >
                                {categoryLabels[category]}
                              </h4>
                              <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-300">
                                {technologies.length}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2 pl-8">
                              {technologies.slice(0, 5).map((tech) => (
                                <TooltipProvider key={tech.name}>
                                  <Tooltip delayDuration={300}>
                                    <TooltipTrigger asChild>
                                      <Badge
                                        className={`${colorClasses.badgeBg} ${colorClasses.badgeText} hover:bg-opacity-80 cursor-pointer transition-colors`}
                                        onClick={() => {
                                          setActiveTab("tech-stack");
                                          setSelectedCategory(category);
                                        }}
                                      >
                                        {tech.name}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom">
                                      <p>{tech.description}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ))}
                              {technologies.length > 5 && (
                                <Badge
                                  variant="outline"
                                  className="cursor-pointer hover:bg-gray-100"
                                  onClick={() => {
                                    setActiveTab("tech-stack");
                                    setSelectedCategory(category);
                                  }}
                                >
                                  +{technologies.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-6 flex justify-center">
                      <Button
                        variant="outline"
                        className={`${colorClasses.border} ${colorClasses.text} hover:${colorClasses.hover}`}
                        onClick={() => setActiveTab("tech-stack")}
                      >
                        View Full Tech Stack
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants} className="md:col-span-1">
                <div className="space-y-6">
                  <Card className={`${platform.color} border shadow-lg h-auto`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                        >
                          <Zap className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-semibold">
                          Key Technologies
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {Object.values(platform.tech_stack)
                          .flat()
                          .sort(
                            (a, b) =>
                              getTechPopularity(b.name) -
                              getTechPopularity(a.name)
                          )
                          .slice(0, 5)
                          .map((tech, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <ChevronRight
                                  className={`h-4 w-4 mr-2 ${platform.iconColor} flex-shrink-0`}
                                />
                                <span className="text-gray-700 font-medium">
                                  {tech.name}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Popularity: {getTechPopularity(tech.name)}%
                              </div>
                            </li>
                          ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className={`${platform.color} border shadow-lg h-auto`}>
                    <CardContent className="pt-6">
                      <div className="flex items-center mb-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                        >
                          <GithubIcon className="h-4 w-4" />
                        </div>
                        <h3 className="text-lg font-semibold">
                          Open Source Projects
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {platform.open_source_projects
                          ?.slice(0, 3)
                          .map((project, index) => (
                            <li key={index} className="flex items-center">
                              <ChevronRight
                                className={`h-4 w-4 mr-2 ${platform.iconColor} flex-shrink-0`}
                              />
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${colorClasses.text} hover:underline`}
                              >
                                {project.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                      <div className="mt-4 text-center">
                        <Button
                          variant="ghost"
                          className="text-sm"
                          onClick={() => setActiveTab("open-source")}
                        >
                          View All Projects
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-8">
              <Card
                className={`${platform.color} border-2 ${colorClasses.border} shadow-lg`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3 shadow-md`}
                    >
                      <Info className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-bold">Did You Know?</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {platform.interesting_facts
                      ?.slice(0, 2)
                      .map((fact, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.2 }}
                          className="bg-white rounded-lg p-5 shadow-sm border flex items-start"
                        >
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3 flex-shrink-0`}
                          >
                            {index === 0 ? (
                              <BarChart2 className="h-5 w-5" />
                            ) : (
                              <Clock className="h-5 w-5" />
                            )}
                          </div>
                          <p className="text-gray-700">{fact}</p>
                        </motion.div>
                      ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      className={`${colorClasses.border} ${colorClasses.text} hover:${colorClasses.hover}`}
                      onClick={() => setActiveTab("facts")}
                    >
                      More Interesting Facts
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="tech-stack" className="mt-0">
            <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="text-xl font-bold">
                  {platform.name}'s Technology Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                    className={
                      selectedCategory === "all" ? platform.accentColor : ""
                    }
                  >
                    All
                  </Button>
                  {Object.keys(platform.tech_stack).map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        selectedCategory === category
                          ? platform.accentColor
                          : ""
                      }
                    >
                      <div className="flex items-center">
                        {categoryIcons[category]}
                        <span className="ml-1.5">
                          {categoryLabels[category]}
                        </span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {filteredTechs.map(([category, technologies]) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="mb-8"
                  >
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                      >
                        {categoryIcons[category]}
                      </div>
                      <h3 className="text-xl font-semibold">
                        {categoryLabels[category]}
                      </h3>
                      <Badge className="ml-2 bg-gray-200 text-gray-700">
                        {technologies.length}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {technologies.map((tech, techIndex) => (
                        <HoverCard key={tech.name}>
                          <HoverCardTrigger asChild>
                            <Link
                              to={`/learning?search=${encodeURIComponent(
                                tech.name
                              )}`}
                              className="block"
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: { delay: 0.1 * techIndex + 0.05 },
                                }}
                                whileHover={{ y: -4 }}
                                className={`${platform.color} border rounded-lg p-4 shadow-sm hover:shadow-md transition-all`}
                              >
                                <div className="font-medium text-lg mb-1 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 mr-2"></span>
                                    {tech.name}
                                  </div>
                                  <Badge
                                    variant="outline"
                                    className={`${colorClasses.badgeBg} border-none text-xs font-normal`}
                                  >
                                    {getTechPopularity(tech.name)}%
                                  </Badge>
                                </div>
                                <p className="text-gray-600 text-sm">
                                  {tech.description}
                                </p>
                                <div className="mt-3 pt-2 border-t">
                                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full bg-gradient-to-r ${colorClasses.gradient}`}
                                      style={{
                                        width: `${getTechPopularity(
                                          tech.name
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-80">
                            <div className="flex flex-col space-y-2">
                              <h4 className="font-semibold">{tech.name}</h4>
                              <p className="text-sm text-gray-600">
                                {tech.description}
                              </p>
                              <div className="pt-2">
                                <p className="text-xs text-gray-500 mb-1">
                                  Industry adoption
                                </p>
                                <div className="flex items-center">
                                  <div className="w-full bg-gray-100 rounded-full h-2 mr-2">
                                    <div
                                      className={`h-2 rounded-full bg-gradient-to-r ${colorClasses.gradient}`}
                                      style={{
                                        width: `${getTechPopularity(
                                          tech.name
                                        )}%`,
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-xs font-medium">
                                    {getTechPopularity(tech.name)}%
                                  </span>
                                </div>
                              </div>
                              <div className="pt-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs w-full"
                                >
                                  <BookOpen className="h-3 w-3 mr-1" />
                                  Learn more
                                </Button>
                              </div>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* Open Source Tab */}
          <TabsContent value="open-source" className="mt-0">
            <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold">
                {platform.name}'s Open Source Contributions
              </h3>
              <p className="text-gray-600">
                These are the open source projects that {platform.name} has
                either created, maintains, or heavily contributes to.
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {platform.open_source_projects?.map((project, index) => (
                <motion.a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={`${platform.color} border rounded-lg p-6 shadow-sm hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="flex items-center mb-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                    >
                      <GithubIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                  </div>
                  <div className="flex items-center text-sm text-blue-600 mb-4">
                    <Globe className="h-3 w-3 mr-1" />
                    <span>
                      {project.url.replace("https://github.com/", "")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 mt-2">
                    <Badge className="bg-gray-100 text-gray-700">
                      <Star
                        className="h-3 w-3 mr-1 text-amber-500"
                        fill="currentColor"
                      />
                      {Math.floor(Math.random() * 10000) + 1000}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-700">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 mr-1 text-gray-600"
                        fill="currentColor"
                      >
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
                      </svg>
                      {Math.floor(Math.random() * 1000) + 100}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-700">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3 mr-1 text-gray-600"
                        fill="currentColor"
                      >
                        <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                        <path
                          fillRule="evenodd"
                          d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"
                        ></path>
                      </svg>
                      {Math.floor(Math.random() * 100) + 10}
                    </Badge>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 border rounded-lg bg-white shadow-sm"
            >
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 text-blue-500 mr-2" />
                <h3 className="font-medium">Why Open Source Matters</h3>
              </div>
              <p className="text-gray-600">
                Large tech companies like {platform.name} contribute to open
                source for various reasons: to give back to the community,
                improve software quality through collaboration, attract talent,
                and establish technical leadership in specific domains.
              </p>
            </motion.div>
          </TabsContent>

          {/* Facts Tab */}
          <TabsContent value="facts" className="mt-0">
            <motion.div
              className="bg-white rounded-lg p-6 border shadow-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                >
                  <Info className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">
                  Interesting Facts About {platform.name}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {platform.interesting_facts?.map((fact, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex items-start p-5 rounded-lg border ${platform.color}`}
                  >
                    <div
                      className={`${platform.accentColor} text-white rounded-full p-2 mr-4 flex-shrink-0`}
                    >
                      {index % 4 === 0 && <BarChart2 className="h-5 w-5" />}
                      {index % 4 === 1 && <Terminal className="h-5 w-5" />}
                      {index % 4 === 2 && <Server className="h-5 w-5" />}
                      {index % 4 === 3 && <Zap className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Fact #{index + 1}</h4>
                      <p className="text-gray-700">{fact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => toast.success("Facts bookmarked!")}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Facts
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => toast.success("Link copied to clipboard!")}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="compare" className="mt-0">
            <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
              <h3 className="text-xl font-bold">Compare Tech Stacks</h3>
              <p className="text-gray-600">
                See how {platform.name}'s tech stack compares with other similar
                companies.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="col-span-1 lg:col-span-2"
              >
                <Card className="border shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                      >
                        <BarChart2 className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        Technology Usage Comparison
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {["Frontend", "Backend", "Infrastructure"].map(
                        (category, i) => (
                          <div key={category} className="space-y-2">
                            <h4 className="font-medium text-gray-700">
                              {category}
                            </h4>
                            <div className="space-y-3">
                              {[
                                ["React", 87, 92, 78],
                                ["TypeScript", 73, 86, 68],
                                ["Node.js", 64, 81, 76],
                              ].map(([tech, value1, value2, value3], index) => (
                                <div key={index} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <span>{tech}</span>
                                    <span className="text-gray-500">
                                      {value1}%
                                    </span>
                                  </div>
                                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                      className={`h-2.5 rounded-full bg-gradient-to-r ${colorClasses.gradient}`}
                                      style={{ width: `${value1}%` }}
                                    ></div>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500">
                                    <span>Industry Avg: {value2}%</span>
                                    <span>Competitors: {value3}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className={`${platform.color} border shadow-lg`}>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-3`}
                      >
                        <Code className="h-4 w-4" />
                      </div>
                      <h3 className="text-lg font-semibold">
                        Similar Companies
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {Object.entries(platformData)
                        .filter(([id]) => id !== platformId)
                        .slice(0, 3)
                        .map(([id, p]) => (
                          <Link key={id} to={`/techstack/${id}`}>
                            <div className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                              <img
                                src={p.logo}
                                alt={p.name}
                                className="w-8 h-8 object-contain mr-3"
                              />
                              <div>
                                <h4 className="font-medium">{p.name}</h4>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {Object.keys(p.tech_stack)
                                    .slice(0, 2)
                                    .map((cat) => (
                                      <Badge
                                        key={cat}
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {categoryLabels[cat]}
                                      </Badge>
                                    ))}
                                  {Object.keys(p.tech_stack).length > 2 && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      +{Object.keys(p.tech_stack).length - 2}{" "}
                                      more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        className="text-sm w-full"
                        onClick={() =>
                          toast.info("Full comparison feature coming soon!")
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Full Comparison
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
        {/* Tech Stack Correction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className={`mt-12 border-2 ${colorClasses.border} rounded-lg p-6 ${platform.color}`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${platform.accentColor} text-white mr-4 shadow-lg`}
              >
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">
                  Spot a mistake or have an update?
                </h3>
                <p className="text-gray-600 max-w-2xl">
                  Our tech stacks are maintained by the community. If you have
                  more accurate information about {platform.name}'s technology
                  stack, please let us know.
                </p>
              </div>
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfnoob6M9Cy0CBgrNyfIvBxL5-zQ0g1DV20BdBjFEVRBZUp_g/viewform?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 rounded-lg bg-gradient-to-r ${platform.accentColor} text-white font-medium shadow-lg hover:shadow-xl transition-all whitespace-nowrap flex items-center`}
            >
              <Edit className="h-4 w-4 mr-2" />
              Submit Correction
            </a>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};
export default TechStackDetail;