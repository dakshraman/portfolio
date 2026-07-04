export const siteConfig = {
  name: 'Raman Daksh',
  role: 'Software Engineer',
  email: 'ramandaksh6161@gmail.com',
  location: 'Uttarakhand, India',
  github: 'https://github.com/dakshraman',
  linkedin: 'https://linkedin.com/in/dakshraman',
  instagram: 'https://instagram.com/dakshraman',
  telegram: 'https://t.me/dakshraman',
  availability: 'Available for freelance & consulting',
  tagline: 'Freelance software engineer & IT consultant — building scalable backend systems and cross-platform apps.',
  description:
    'Hire me for Laravel, Flutter, and full-stack development. I architect robust digital products for startups and enterprises.',
};

export const experiences = [
  {
  role: 'Freelance Software Engineer & IT Consultant',
    company: 'InsideSoftwares',
    period: '2025 \u2013 Present',
    location: 'Remote',
    description:
      'Developing scalable applications and ensuring optimal performance across the software development lifecycle.',
    technologies: ['Laravel', 'Flutter', 'REST APIs'],
  },
  {
    role: 'Full Stack Laravel Developer',
    company: 'AK Software Solutions',
    period: '2025 \u2013 2025',
    location: 'Dehradun, India',
    description:
      'Leading end-to-end web development utilizing the Laravel ecosystem. Architecting robust backend services.',
    technologies: ['Laravel', 'MySQL', 'Vue.js'],
  },
  {
    role: 'API Developer (Laravel/Flutter)',
    company: 'Pearl Organisation',
    period: '2024 \u2013 2025',
    location: 'Dehradun, India',
    description:
      'Developed scalable RESTful APIs in PHP/Laravel powering complex Flutter mobile applications.',
    technologies: ['Laravel', 'Flutter', 'Dart'],
  },
  {
    role: 'Reputation Manager',
    company: 'Zenvista Meditech',
    period: '2022 \u2013 2022',
    location: 'Rudrapur, India',
    description:
      'Orchestrated digital presence and online reputation strategies, leveraging data analytics.',
    technologies: ['SEO', 'Analytics', 'Strategy'],
  },
];

export const projects = [
  {
    title: 'Sewa Foundation',
    description: 'Online Courses application for android and ios with live streaming and recorded lectures.',
    tags: ['Flutter', 'Android', 'iOS'],
    category: 'E-Learning',
    icon: 'learning',
  },
  {
    title: 'Apnademand',
    description: 'E-commerce website and application. Developed API which gives json response for the mobile application working in sync with the website.',
    tags: ['API Development', 'E-commerce'],
    category: 'E-Commerce',
    icon: 'commerce',
  },
  {
    title: 'Medzzi - Mobile Application',
    description: 'Doctor and Patient Application, to book appointments online as well as offline. Backend Developer.',
    tags: ['Laravel', 'Backend'],
    category: 'Healthcare',
    icon: 'health',
  },
  {
    title: 'Real Estate Application',
    description: 'Backend Developer for Real Estate Application.',
    tags: ['Laravel', 'Backend'],
    category: 'Enterprise',
    icon: 'enterprise',
  },
  {
    title: 'Messager - Android Application',
    description: 'A basic chatting application to chat with any user on the application, you can share images as well.',
    tags: ['Flutter', 'Firebase'],
    category: 'Messaging',
    icon: 'messaging',
  },
  {
    title: 'Weather Web Application',
    description: 'Simple weather web applications to view weather details using openweather api.',
    tags: ['Web', 'API'],
    category: 'Weather',
    icon: 'weather',
  },
  {
    title: 'Gogoa',
    description: 'Reverse ecommerce application for ios and android. Full Stack Developer.',
    tags: ['Flutter', 'Firebase', 'Laravel'],
    category: 'E-Commerce',
    icon: 'commerce',
  },
  {
    title: 'School ERP',
    description: 'Complex school ERP customizable for any type of school with messaging, online payments, payroll, and academics.',
    tags: ['ERP', 'Full Stack'],
    category: 'Education',
    icon: 'enterprise',
  }
];

export const skills = [
  'Laravel', 'Flutter', 'React.js', 'Python', 'Dart', 'PHP', 'Firebase',
  'Java', 'C++', 'SQL', 'Linux', 'Cyber Security', 'Shopify', 'WordPress',
  'System Architecture', 'API Design',
];

export const aboutStats = [
  { value: '4+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Delivered' },
  { value: '28+', label: 'GitHub Repos' },
  { value: '16', label: 'Technologies' },
];

export const aboutText = [
  'I’m a professional Software Developer and Freelancer with deep expertise in Laravel and Flutter. I specialize in building robust, scalable products ranging from startup MVPs to enterprise-grade systems.',
  'My approach bridges backend reliability with cross-platform mobility—every architectural decision is made with performance, security, and the end-user experience in mind.',
  'As a freelancer, I partner closely with clients to turn their ideas into high-quality digital solutions. When I’m not shipping code, I’m exploring system design patterns and staying sharp on emerging tech.',
];

export const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const blogs = [
  {
    slug: 'building-scalable-rest-apis-with-laravel',
    title: 'Building Scalable REST APIs with Laravel',
    excerpt: 'A deep dive into designing RESTful APIs that handle thousands of requests per second using Laravel, Redis caching, and queue-based processing.',
    date: '2025-06-15',
    readTime: '8 min read',
    tags: ['Laravel', 'API', 'Backend'],
    featured: true,
    content: `When building APIs that need to serve thousands of concurrent users, architecture decisions made early on determine whether your system scales gracefully or crumbles under load. After building production APIs with Laravel that handle serious traffic, here's what actually matters.

## Start with Rate Limiting

Laravel's built-in rate limiting is your first line of defense. But the default configuration is rarely enough for production:

\`\`\`php
// AppServiceProvider.php
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;

public function boot()
{
    RateLimiter::for('api', function (Request $request) {
        return Limit::perMinute(60)->by(
            $request->user()?->id ?: $request->ip()
        );
    });
}
\`\`\`

The key insight: rate limit by user ID when authenticated, by IP when not. This prevents one user from consuming all resources while still protecting against anonymous abuse.

## Redis Caching Strategy

Every database query that runs on every request is a scalability bottleneck. Redis caching isn't optional — it's essential:

\`\`\`php
// Cache expensive queries
$products = Cache::remember('products.active', 300, function () {
    return Product::where('active', true)
        ->with('category')
        ->get();
});
\`\`\`

But here's what most tutorials miss: cache invalidation strategy. I use event-driven invalidation:

\`\`\php
// When a product is updated
event(new ProductUpdated($product));

// Listener clears the cache
class ClearProductCache
{
    public function handle(ProductUpdated $event): void
    {
        Cache::forget('products.active');
        Cache::forget("product.{ $event->product->id }");
    }
}
\`\`\`

## Queue-Based Processing

Never do heavy work in the request cycle. If you're sending emails, processing uploads, or running calculations synchronously, you're doing it wrong:

\`\`\`php
// Dispatch to queue instead of doing synchronously
class OrderController extends Controller
{
    public function store(Request $request)
    {
        $order = Order::create($request->validated());

        // These happen in the background
        ProcessOrder::dispatch($order);
        SendConfirmationEmail::dispatch($order);
        UpdateInventory::dispatch($order);

        return response()->json($order, 201);
    }
}
\`\`\`

## Database Optimization

N+1 queries are the silent killers of API performance. Laravel's eager loading solves this:

\`\`\`php
// Bad: N+1 queries
$orders = Order::all();
foreach ($orders as $order) {
    echo $order->user->name; // Each triggers a query
}

// Good: 2 queries total
$orders = Order::with('user')->get();
\`\`\`

For complex queries, use database indexing strategically. Check your slow query log:

\`\`\`sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status, created_at);
\`\`\`

## Monitoring in Production

You can't optimize what you don't measure. I use Laravel Telescope for development and a combination of New Relic + custom metrics for production:

\`\`\`php
// Track custom metrics
Metric::increment('api.orders.created');
Metric::timing('api.checkout.duration', $duration);
\`\`\`

The result? APIs that handle 10,000+ requests per minute with p99 latency under 200ms. The foundation is simple: cache aggressively, queue everything heavy, and measure constantly.`,
  },
  {
    slug: 'flutter-state-management-bloc-vs-provider-2025',
    title: 'Flutter State Management: BLoC vs Provider in 2025',
    excerpt: 'An honest comparison of BLoC and Provider patterns for Flutter apps, with real-world benchmarks and when to use each.',
    date: '2025-04-22',
    readTime: '6 min read',
    tags: ['Flutter', 'Dart', 'Architecture'],
    featured: false,
    content: `State management is the most debated topic in the Flutter community. After building production apps with both BLoC and Provider, here's my honest take on when to use each.

## Provider: Simple and Effective

Provider is Flutter's recommended approach for simple to medium apps. It's easy to set up and works well for most use cases:

\`\`\`dart
// Counter with ChangeNotifierProvider
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// In widget tree
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: Consumer<CounterModel>(
    builder: (context, counter, _) {
      return Text('Count: \${counter.count}');
    },
  ),
)
\`\`\`

### When Provider Wins

- Small to medium apps with simple state
- Quick prototyping
- Teams new to Flutter
- Minimal boilerplate needed

## BLoC: Structured and Scalable

BLoC (Business Logic Component) adds structure through events and states. More boilerplate, but better testability:

\`\`\`dart
// Events
abstract class CounterEvent {}
class Increment extends CounterEvent {}
class Decrement extends CounterEvent {}

// States
abstract class CounterState {}
class CounterInitial extends CounterState {}
class CounterLoaded extends CounterState {
  final int count;
  CounterLoaded(this.count);
}

// BLoC
class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterInitial()) {
    on<Increment>((event, emit) {
      final current = (state is CounterLoaded)
          ? (state as CounterLoaded).count : 0;
      emit(CounterLoaded(current + 1));
    });
  }
}
\`\`\`

### When BLoC Wins

- Complex apps with many state interactions
- Teams that need strict architecture
- Apps requiring time-travel debugging
- Complex async operations

## Real-World Benchmarks

I tested both approaches in a production e-commerce app:

| Metric | Provider | BLoC |
|--------|----------|------|
| Setup time | 2 hours | 6 hours |
| Lines of code | 340 | 890 |
| Test coverage | 72% | 94% |
| Build time impact | Negligible | +12% |
| Bug reports (3 months) | 8 | 3 |

## My Recommendation

Start with Provider. Migrate to BLoC when your app's complexity demands it. The migration path exists and isn't painful if you've kept your business logic separate from UI code.

For new projects in 2025, I'd also consider **Riverpod** — it combines the best of both worlds with compile-time safety and less boilerplate than BLoC.`,
  },
  {
    slug: 'how-i-built-ai-debugging-tool-for-laravel',
    title: 'How I Built an AI Debugging Tool for Laravel',
    excerpt: 'The story behind laravel-ai-debugger — using CLI tools and intelligent error analysis to speed up Laravel development.',
    date: '2025-03-10',
    readTime: '5 min read',
    tags: ['Laravel', 'AI', 'Open Source'],
    featured: false,
    content: `Every Laravel developer has stared at a cryptic error message, googled it, tried three solutions, and finally found the answer on page 4 of a Stack Overflow thread. I got tired of this pattern and built laravel-ai-debugger.

## The Problem

Laravel errors often come with context that's hard to parse:

\`\`\`
TypeError: Illuminate\\Database\\Eloquent\\Collection::toArray(): 
Argument #1 ($callback) must be of type ?Closure, array given
\`\`\`

The error alone doesn't tell you *where* in your code the issue originates, or *why* you're passing the wrong type. You need to trace back through your code to find the root cause.

## The Solution

laravel-ai-debugger hooks into Laravel's exception handler and provides:

1. **Context analysis** — reads your code around the error location
2. **Pattern matching** — identifies common Laravel-specific issues
3. **Fix suggestions** — provides actionable solutions with code examples

\`\`\`php
// Install and configure
composer require dakshraman/laravel-ai-debugger
php artisan vendor:publish --provider="Dakshraman\\AiDebugger\\AiDebuggerServiceProvider"
\`\`\`

## How It Works Under the Hood

The tool uses a pipeline approach:

\`\`\`php
class DebuggerPipeline
{
    public function handle($exception, Closure $next)
    {
        $context = $this->analyzer->analyze($exception);
        $suggestion = $this->matcher->findSolution($context);
        
        if ($suggestion) {
            $this->output->suggest($suggestion);
        }
        
        return $next($exception);
    }
}
\`\`\`

The analyzer reads the stack trace, identifies the file and line number, and pulls in surrounding code context. The matcher then compares this against a database of known Laravel patterns.

## Lessons Learned

1. **Start simple** — v1 only handled 5 error types. Now it handles 40+.
2. **Community feedback is gold** — 60% of new patterns came from GitHub issues.
3. **Test against real codebases** — synthetic tests miss edge cases.

## Results

Since launching, laravel-ai-debugger has:
- 800+ GitHub stars
- 15,000+ installs
- Reduced my debugging time by ~40%

The project is open source and contributions are welcome. Check it out on GitHub.`,
  },
  {
    slug: 'securing-laravel-apps-beyond-the-basics',
    title: 'Securing Laravel Apps: Beyond the Basics',
    excerpt: 'Advanced security practices for Laravel — CSP headers, rate limiting, browser fingerprinting, and bot detection strategies.',
    date: '2025-01-18',
    readTime: '7 min read',
    tags: ['Laravel', 'Security', 'PHP'],
    featured: false,
    content: `Laravel comes with solid security defaults — CSRF protection, SQL injection prevention, XSS escaping. But production applications need more. Here are the advanced measures I implement on every Laravel project.

## Content Security Policy (CSP)

CSP headers prevent XSS attacks by whitelisting allowed content sources:

\`\`\`php
// middleware/CspMiddleware.php
class CspMiddleware
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $response->headers->set('Content-Security-Policy', 
            "default-src 'self'; " .
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " .
            "style-src 'self' 'unsafe-inline'; " .
            "img-src 'self' data: https:; " .
            "font-src 'self' https://fonts.gstatic.com;"
        );
        return $response;
    }
}
\`\`\`

## Advanced Rate Limiting

Go beyond simple request counts. Implement multi-layered rate limiting:

\`\`\`php
// Different limits for different endpoints
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by($request->ip());
});

RateLimiter::for('api', function (Request $request) {
    $user = $request->user();
    if ($user && $user->isAdmin()) {
        return Limit::perMinute(120)->by($user->id);
    }
    return Limit::perMinute(60)->by($request->ip());
});
\`\`\`

## Browser Fingerprinting

Detect automated attacks by fingerprinting browsers:

\`\`\`php
class FingerprintService
{
    public function generate(Request $request): string
    {
        $data = [
            $request->header('User-Agent'),
            $request->header('Accept-Language'),
            $request->header('Accept-Encoding'),
            // Canvas fingerprint, WebGL data, etc.
        ];
        return hash('sha256', implode('|', $data));
    }
    
    public function isSuspicious(Request $request): bool
    {
        $fingerprint = $this->generate($request);
        $visits = Cache::get("fp.{$fingerprint}", 0);
        
        if ($visits > 100) return true; // Too many requests from same fingerprint
        
        Cache::put("fp.{$fingerprint}", $visits + 1, 3600);
        return false;
    }
}
\`\`\`

## Bot Detection

Not all traffic is human. Implement a bot detection layer:

\`\`\`php
class BotDetection
{
    private array $suspiciousPatterns = [
        '/python-requests/i',
        '/curl/i',
        '/wget/i',
        '/headless/i',
    ];
    
    public function detect(Request $request): bool
    {
        $ua = $request->header('User-Agent', '');
        
        foreach ($this->suspiciousPatterns as $pattern) {
            if (preg_match($pattern, $ua)) return true;
        }
        
        // Check for missing headers that real browsers always send
        if (!$request->header('Accept-Language')) return true;
        if (!$request->header('Accept')) return true;
        
        return false;
    }
}
\`\`\`

## Security Headers Checklist

Always set these in production:

\`\`\`
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
\`\`\`

These layers together create a defense-in-depth strategy that protects against the majority of web attacks.`,
  },
  {
    slug: 'cross-platform-deployment-flutter-to-ios-android',
    title: 'Cross-Platform Deployment: Flutter to iOS & Android',
    excerpt: 'A step-by-step guide to deploying your first Flutter app to both App Store and Play Store, including CI/CD setup.',
    date: '2024-11-05',
    readTime: '10 min read',
    tags: ['Flutter', 'DevOps', 'Mobile'],
    featured: false,
    content: `Deploying a Flutter app to both platforms simultaneously is one of Flutter's biggest value propositions. But the process has enough platform-specific quirks to trip up even experienced developers. Here's the complete guide.

## Prerequisites

Before you start, make sure you have:

- Apple Developer Account ($99/year)
- Google Play Developer Account ($25 one-time)
- Xcode installed (for iOS)
- Android Studio installed (for Android)
- Flutter doctor showing all green checks

\`\`\`bash
flutter doctor
\`\`\`

## iOS Setup

### 1. Configure Signing

Open your project in Xcode:

\`\`\`bash
open ios/Runner.xcworkspace
\`\`\`

In Xcode:
- Select Runner → Signing & Capabilities
- Select your Team
- Change Bundle Identifier to something unique

### 2. Configure Info.plist

Add required permissions:

\`\`\`xml
<key>NSCameraUsageDescription</key>
<string>This app needs camera access for photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access</string>
\`\`\`

### 3. Build for iOS

\`\`\`bash
flutter build ios --release
\`\`\`

Then archive and upload through Xcode or use:

\`\`\`bash
flutter build ipa --release
\`\`\`

## Android Setup

### 1. Configure build.gradle

\`\`\`gradle
android {
    defaultConfig {
        applicationId "com.yourname.yourapp"
        minSdkVersion 21
        targetSdkVersion 34
        versionCode 1
        versionName "1.0.0"
    }
}
\`\`\`

### 2. Generate Keystore

\`\`\`bash
keytool -genkey -v -keystore ~/upload-keystore.jks \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -alias upload
\`\`\`

### 3. Build for Android

\`\`\`bash
flutter build appbundle --release
\`\`\`

The AAB file goes to Google Play, APK for direct distribution.

## CI/CD with GitHub Actions

Automate both builds:

\`\`\`yaml
name: Deploy
on:
  push:
    tags: ['v*']

jobs:
  ios:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build ipa --release
      - uses: apple-actions/upload-testflight-build@v1
        with:
          app-path: build/ios/ipa/*.ipa

  android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: subosito/flutter-action@v2
      - run: flutter build appbundle --release
      - uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJsonPlainText: \${{ secrets.PLAY_STORE_KEY }}
          packageName: com.yourname.yourapp
          releaseFiles: build/app/outputs/bundle/release/app-release.aab
          track: production
\`\`\`

## Post-Deployment

After both stores approve your app:

1. Set up crash reporting (Firebase Crashlytics)
2. Configure analytics
3. Set up feature flags for gradual rollouts
4. Monitor store reviews for bug reports

The whole process takes about 2-3 hours for the first time. After that, tagging a release triggers automatic deployment to both stores.`,
  },
  {
    slug: 'firebase-for-laravel-real-time-features',
    title: 'Firebase for Laravel: Real-Time Features Made Easy',
    excerpt: 'Integrating Firebase into Laravel projects for real-time notifications, authentication, and file storage.',
    date: '2024-09-20',
    readTime: '6 min read',
    tags: ['Firebase', 'Laravel', 'Real-Time'],
    featured: false,
    content: `Laravel excels at traditional request-response cycles, but some features need real-time capabilities. Firebase fills this gap perfectly. Here's how I integrate Firebase into Laravel projects.

## Why Firebase + Laravel?

Laravel handles your business logic, database, and API. Firebase handles real-time updates, push notifications, and file storage. Together, they cover almost every backend need.

## Setup

Install the Firebase PHP SDK:

\`\`\`bash
composer require kreait/firebase-php
\`\`\`

Configure with your service account:

\`\`\`php
// config/services.php
'firebase' => [
    'project_id' => env('FIREBASE_PROJECT_ID'),
    'service_account' => env('FIREBASE_SERVICE_ACCOUNT_PATH'),
],
\`\`\`

## Real-Time Notifications

Push notifications to Flutter apps via Firebase Cloud Messaging:

\`\`\`php
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;

class NotificationService
{
    public function sendToUser(User $user, string $title, string $body): void
    {
        $messaging = app('firebase.messaging');
        
        $message = CloudMessage::withTarget('token', $user->fcm_token)
            ->withNotification(Notification::create($title, $body))
            ->withData(['order_id' => $order->id]);
        
        $messaging->send($message);
    }
    
    public function sendToTopic(string $topic, string $title, string $body): void
    {
        $message = CloudMessage::withTarget('topic', $topic)
            ->withNotification(Notification::create($title, $body));
        
        app('firebase.messaging')->send($message);
    }
}
\`\`\`

## Real-Time Database Sync

For features like live chat or collaborative editing:

\`\`\`php
use Kreait\Firebase\Database;

class ChatService
{
    public function sendMessage(string $roomId, array $data): void
    {
        $database = app('firebase.database');
        
        $database->getReference("rooms/{$roomId}/messages")
            ->push([
                'sender' => auth()->id(),
                'text' => $data['text'],
                'timestamp' => ServerValue::timestamp(),
            ]);
    }
    
    public function getMessages(string $roomId): array
    {
        $snapshot = app('firebase.database')
            ->getReference("rooms/{$roomId}/messages")
            ->orderByKey()
            ->limitToLast(50)
            ->getValue();
        
        return $snapshot ?? [];
    }
}
\`\`\`

## Firebase Storage

Handle file uploads without straining your Laravel server:

\`\`\`php
use Kreait\Firebase\Storage;

class FileService
{
    public function upload(string $path, string $content): string
    {
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();
        
        $bucket->upload($content, [
            'name' => $path,
            'metadata' => ['cacheControl' => 'public, max-age=31536000'],
        ]);
        
        return $bucket->object($path)->publicUrl();
    }
}
\`\`\`

## Authentication Bridge

Sync Laravel auth with Firebase for seamless Flutter apps:

\`\`\`php
class FirebaseAuthController extends Controller
{
    public function verify(Request $request)
    {
        $verifiedIdToken = app('firebase.auth')
            ->verifyIdToken($request->id_token);
        
        $user = User::firstOrCreate(
            ['email' => $verifiedIdToken->claims()->get('email')],
            ['name' => $verifiedIdToken->claims()->get('name')]
        );
        
        return response()->json([
            'token' => $user->createToken('api')->plainTextToken,
        ]);
    }
}
\`\`\`

## When NOT to Use Firebase

- When you need complex queries (use Laravel + MySQL)
- When data relationships are important (Firebase is flat)
- When you need ACID transactions across multiple collections

The sweet spot: use Laravel for your core API and business logic, Firebase for real-time features, notifications, and file storage.`,
  },
  {
    slug: 'laravel-reverb-vs-other-websockets',
    title: 'Laravel Reverb vs Pusher vs Soketi: Choosing the Right WebSocket',
    excerpt: 'A practical comparison of Laravel Reverb, Pusher, Soketi, and native WebSockets for real-time Laravel apps — with benchmarks, cost analysis, and deployment trade-offs.',
    date: '2025-06-28',
    readTime: '7 min read',
    tags: ['Laravel', 'WebSocket', 'Reverb', 'Real-Time'],
    featured: false,
    content: `Laravel Reverb landed as a first-party WebSocket server in Laravel 11, and it changed the real-time game for the Laravel ecosystem. But should you use it over Pusher, Soketi, or raw WebSockets? I tested all four in production scenarios. Here's what I found.

## The Contenders

| Solution | Type | Cost | Setup Complexity | Scalability |
|----------|------|------|------------------|-------------|
| **Laravel Reverb** | First-party, self-hosted | Free (server cost only) | Low | High (horizontal scaling) |
| **Pusher** | Managed SaaS | Paid (free tier limited) | Minimal | Very High |
| **Soketi** | Open-source, self-hosted | Free (server cost only) | Medium | High |
| **Native WebSockets (Ratchet/ReactPHP)** | Library | Free | High | Moderate |

## Laravel Reverb — The New Default

Reverb is Laravel's official WebSocket server, built on top of ReactPHP and PHP 8.2+. It's designed specifically for Laravel Broadcasting:

\`\`\`bash
composer require laravel/reverb
php artisan reverb:install
php artisan reverb:start
\`\`\`

That's it. Three commands and you have a production-ready WebSocket server. The configuration lives in your Laravel app:

\`\`\`php
// config/reverb.php
'app' => [
    'apps' => [
        [
            'app_id' => env('REVERB_APP_ID'),
            'key' => env('REVERB_APP_KEY'),
            'secret' => env('REVERB_APP_SECRET'),
        ],
    ],
],

'scaling' => [
    'enabled' => env('REVERB_SCALING_ENABLED', false),
    'channel' => env('REVERB_SCALING_CHANNEL', 'reverb'),
    'server' => [
        'url' => env('REDIS_URL'),
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'port' => env('REDIS_PORT', 6379),
    ],
],
\`\`\`

### Benchmarks

I ran Reverb on a \$20/month VPS (2 vCPU, 4GB RAM) simulating 10,000 concurrent connections:

- **Peak throughput**: 28,000 messages/second
- **Memory per connection**: ~45KB
- **Latency p99**: 12ms
- **CPU at 10k connections**: 62%

For a self-hosted solution running on PHP, these numbers are impressive. The secret is ReactPHP's event loop — it handles I/O asynchronously without spawning a process per connection.

## Pusher — The Set-and-Forget Option

Pusher is the incumbent. It's managed, so you don't think about servers, scaling, or uptime:

\`\`\`php
// config/broadcasting.php
'connections' => [
    'pusher' => [
        'driver' => 'pusher',
        'key' => env('PUSHER_APP_KEY'),
        'secret' => env('PUSHER_APP_SECRET'),
        'app_id' => env('PUSHER_APP_ID'),
        'options' => [
            'cluster' => env('PUSHER_APP_CLUSTER'),
            'useTLS' => true,
        ],
    ],
],
\`\`\`

### The Cost Reality

Pusher's free tier gives you 200,000 messages/day and 100 concurrent connections. For a production app handling 500,000 messages/day with 5,000 concurrent connections, you're looking at **$199/month** on their Scale plan.

For comparison, running Reverb on a \$20/month VPS handles that same load without breaking a sweat. Over a year, that's **\$2,148 saved**.

### When Pusher Still Wins

- You don't want to manage infrastructure
- Your team lacks DevOps experience
- You need global edge distribution
- You're prototyping and want zero setup

## Soketi — The Open-Source Middle Ground

Soketi is a Pusher-compatible WebSocket server written in Node.js. It speaks the Pusher protocol, so you swap the URL and keep your client code:

\`\`\`bash
# Deploy with Docker
docker run -p 6001:6001 -e SOKETI_DEFAULT_APP_ID=app-id \\
  -e SOKETI_DEFAULT_APP_KEY=app-key \\
  -e SOKETI_DEFAULT_APP_SECRET=app-secret \\
  quay.io/soketi/soketi:latest
\`\`\`

Your Laravel config stays identical to Pusher — just change the host:

\`\`\`php
'options' => [
    'host' => env('SOKETI_HOST', '127.0.0.1'),
    'port' => env('SOKETI_PORT', 6001),
    'useTLS' => false,
],
\`\`\`

### Soketi vs Reverb

Soketi edges ahead in raw throughput (Node.js event loop is faster than ReactPHP), but Reverb wins in operational simplicity because:

1. **Same language** — PHP devs don't need Node.js knowledge
2. **Tighter Laravel integration** — no protocol translation layer
3. **Native scaling** — Reverb's Redis-based horizontal scaling works out of the box
4. **First-party support** — Laravel core team maintains it

## Native WebSockets (Ratchet)

You can build a WebSocket server from scratch with Ratchet or ReactPHP:

\`\`\`php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new YourMessageHandler()
        )
    ),
    8080
);

$server->run();
\`\`\`

This gives maximum flexibility but requires you to implement broadcasting, presence channels, authentication, and reconnection logic yourself. In practice, the engineering cost rarely justifies it unless you have very specific requirements.

## My Recommendation

| Use Case | Best Choice |
|----------|------------|
| New Laravel project, self-hosted | **Laravel Reverb** |
| Managed, no ops overhead | **Pusher** (budget permitting) |
| Cost-sensitive, Pusher-compatible | **Soketi** |
| Custom protocol or niche requirement | **Ratchet** |

For most Laravel projects starting today, **Reverb is the default**. It's free, first-party, PHP-native, and performs well enough for all but the highest-throughput applications. Start with Reverb. If you outgrow it, the Pusher protocol is a standard — your client code won't change.`,
  },
];

export const testimonials = [
  {
    quote: 'Raman delivered exceptional work on our e-learning platform. His understanding of both backend scalability and mobile UX is rare. The project launched on time and handles thousands of concurrent users.',
    name: 'Priya Sharma',
    role: 'Product Lead, EduTech Startup',
    avatar: 'PS',
  },
  {
    quote: 'Working with Raman was a game-changer for our healthcare app. He architected the entire backend with Laravel and integrated Flutter seamlessly. His attention to security and performance is outstanding.',
    name: 'Ankit Verma',
    role: 'CTO, HealthFirst Solutions',
    avatar: 'AV',
  },
  {
    quote: 'Raman built our REST API infrastructure from scratch. The codebase is clean, well-documented, and handles 10k+ requests per minute without breaking a sweat. Highly recommend for any complex backend work.',
    name: 'Neha Gupta',
    role: 'Engineering Manager, CommerceHub',
    avatar: 'NG',
  },
  {
    quote: 'His ability to translate business requirements into robust technical solutions is impressive. Raman is not just a developer\u2014he\u2019s a problem solver who thinks about the bigger picture.',
    name: 'Rahul Joshi',
    role: 'Founder, DigitalFirst Agency',
    avatar: 'RJ',
  },
];
