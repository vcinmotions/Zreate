import dynamic from "next/dynamic";

const Feature = dynamic(() => import("./Features"), {
  ssr: true,
});

const Integration = dynamic(() => import("./Integration"), {
  ssr: true,
});

const FeaturesTab = dynamic(() => import("./FeaturesTab"), {
  ssr: true,
});

const Carrer = dynamic(() => import("./Carrer"), {
  ssr: true,
});

const Brands = dynamic(() => import("./Brands"), {
  ssr: true,
});

const Testimonial = dynamic(() => import("./Testimonial"), {});

const FAQ = dynamic(() => import("./FAQ"), {
  ssr: true,
});

export default function ClientSections() {
  return (
    <>
      <Feature />
      <Integration />
      <Carrer />
      <FeaturesTab />
      <Brands />
      <Testimonial />
      <FAQ />
    </>
  );
}
