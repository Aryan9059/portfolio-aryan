import Hero from "@/components/Hero";
import Stack from "@/components/Stack";
import About from "@/components/About";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import Showcase from "@/components/Showcase";
import { DeviceSimulator } from "@/components/DeviceSimulator";
import FeaturedWork from "@/components/FeaturedWork";

export default function Page(){
  return (
  <main className="appd-root">
      <Hero/>
      <About/>
      <Stack/>
      <Team/>
      <FeaturedWork/>
      <Showcase/>
      <DeviceSimulator/>
      <Footer/>
    
    </main>
  );
}
