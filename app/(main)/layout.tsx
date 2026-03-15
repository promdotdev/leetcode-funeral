import Providers from '@/components/Providers';
import BottomNav from '@/components/BottomNav';
import SplashScreen from '@/components/SplashScreen';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="checkerboard-bg" />
      <div className="fixed inset-0 z-1 overflow-hidden pointer-events-none">
        <img src="/detective.png" alt="" className="absolute right-0 bottom-0 h-screen object-contain object-bottom" style={{ transform: 'translateX(35%)' }} />
        <img src="/skull.png" alt="" className="absolute top-8 -left-[10%] sm:left-4 w-40 sm:w-64 opacity-80 -rotate-15" />
        <img src="/casket.png" alt="" className="absolute bottom-0 left-2 w-40 sm:w-56 opacity-80" />
        <img src="/lily.png" alt="" className="hidden sm:block absolute bottom-14 left-72 w-56 opacity-80" />
      </div>
      <SplashScreen />
      <Providers>
        <main className="relative z-10 mx-auto min-h-screen max-w-[400px] px-6">
          <div className="pt-4">
            {children}
          </div>
        </main>
        <BottomNav />
      </Providers>
    </>
  );
}
