import { ArrowUpRight, BadgeCheck, Clock3, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceCreative, formatRate, getInitials } from '@/lib/marketplace';

type CreativeProfileCardProps = {
  creative: MarketplaceCreative;
  onHire: (creative: MarketplaceCreative) => void;
  compact?: boolean;
};

const CreativeProfileCard = ({
  creative,
  onHire,
  compact = false,
}: CreativeProfileCardProps) => {
  return (
    <article className="luxe-card overflow-hidden bg-card/95">
      <div className={`relative h-48 bg-gradient-to-br ${creative.tone} p-6 text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_40%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.28em] text-white/70">
                {creative.category}
              </p>
              <h3 className="mt-3 max-w-[14rem] font-display text-3xl leading-none">
                {creative.name}
              </h3>
            </div>
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg font-semibold backdrop-blur">
              {getInitials(creative.name)}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {creative.verified ? (
              <Badge className="border-white/15 bg-white/15 text-white hover:bg-white/15">
                <BadgeCheck className="mr-1.5 h-3.5 w-3.5" />
                Verified
              </Badge>
            ) : null}
            {creative.featured ? (
              <Badge className="border-secondary/0 bg-secondary text-secondary-foreground hover:bg-secondary">
                Featured
              </Badge>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-3">
          <p className="text-lg font-medium leading-snug text-foreground">
            {creative.headline}
          </p>
          <p className="text-sm leading-7 text-foreground/70">{creative.bio}</p>
        </div>

        <div className="grid gap-3 text-sm text-foreground/70 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-secondary" />
            <span>{creative.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-secondary" />
            <span>{creative.responseTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {creative.specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-foreground/70"
            >
              {item}
            </span>
          ))}
        </div>

        {!compact ? (
          <div className="rounded-2xl bg-muted/50 p-4">
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
              Recent focus
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {creative.portfolioHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-background px-3 py-1 text-xs text-foreground/75"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.24em] text-foreground/45">
              Starting from
            </p>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {formatRate(creative.rateFrom)}
            </p>
          </div>

          <Button
            type="button"
            onClick={() => onHire(creative)}
            className="rounded-full px-5"
          >
            Hire this creative
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
};

export default CreativeProfileCard;
