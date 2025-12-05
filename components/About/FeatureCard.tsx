interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
}

const FeatureCard = ({ id, title, description }: FeatureCardProps) => {
  return (
    <div className="group border-border bg-card shadow-soft hover:border-primary/50 hover:shadow-medium relative overflow-hidden rounded-2xl border p-6 transition-all duration-300">
      <div className="text-primary/5 group-hover:text-primary/10 absolute top-4 right-4 text-5xl font-bold transition-all duration-300">
        {id}
      </div>
      <div className="relative">
        <div className="bg-gradient-primary shadow-glow mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-card-foreground mb-2 text-xl font-semibold">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
