import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    designation: "CEO @ TechFlow Solutions",
    image: image1,
    content:
      "ZREATE transformed our business operations with their exceptional SaaS platform. The team's expertise in cloud architecture and user experience design helped us scale from 100 to 10,000+ users seamlessly. Their ongoing support and maintenance have been outstanding, ensuring our platform remains secure and performant.",
  },
  {
    id: 2,
    name: "Michael Chen",
    designation: "Operations Director @ Global Manufacturing Co.",
    image: image2,
    content:
      "We partnered with ZREATE to implement a comprehensive ERP system, and the results exceeded our expectations. The integration with our existing systems was flawless, and the training program they provided helped our team adapt quickly. Our operational efficiency has improved by 40% since implementation.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    designation: "Marketing Head @ Digital Ventures",
    image: image1,
    content:
      "ZREATE's digital marketing services have been a game-changer for our brand. Their strategic approach and data-driven campaigns increased our online visibility by 300% and generated significant ROI. The team is responsive, creative, and truly understands our business goals.",
  },
  {
    id: 4,
    name: "David Thompson",
    designation: "CTO @ StartupHub",
    image: image2,
    content:
      "As a growing startup, we needed reliable IT talent quickly. ZREATE's outsourcing service provided us with skilled developers who integrated seamlessly into our team. Their professionals are not just technically excellent but also understand business requirements. Highly recommended for any company looking to scale their tech team.",
  },
];
