import { ICampaign } from "@/types/Campaign";
import { cn } from "@/utils/cn";
import { convertIDR } from "@/utils/currency";
import { convertTime } from "@/utils/date";
import { Card, CardBody, CardFooter, Progress, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface PropTypes {
  className?: string;
  campaign?: ICampaign;
  isLoading?: boolean;
  key?: string;
}

const CardCampaign = (props: PropTypes) => {
  const { className, campaign, isLoading, key } = props;

  return (
    <Card
      shadow="sm"
      isPressable
      as={Link}
      href={`/campaign/${campaign?.slug}`}
      key={key}
      className={cn(className, "cursor-pointer")}
    >
      {!isLoading ? (
        <Fragment>
          <div className="mt-4">
            <CardBody>
              <Image
                alt="cover"
                src={`${campaign?.image}`}
                width={1920}
                height={1080}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </CardBody>
          </div>
          <CardFooter className="flex flex-col items-start pt-0 text-left">
            <h2 className="line-clamp-1 text-lg font-bold text-teal-700">
              {campaign?.name}
            </h2>
            <p className="mb-2 line-clamp-2">{campaign?.description}</p>
            <div className="flex w-full justify-between">
              <span className="text-small mb-2">Terkumpul: {convertIDR(Number(campaign?.collectedAmount))}</span>
              <span className="text-small mb-2 font-bold">{campaign?.progressValue}%</span>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-md mb-2">
              <Progress aria-label={`progress-${campaign?.name}`} color="warning" value={campaign?.progressValue} />
            </div>
            <p className="text-foreground-500 text-sm md:text-base">
              {(() => {
                const deadline = new Date(campaign?.deadline || '');
                const now = new Date();
                const diffTime = Math.max(deadline.getTime() - now.getTime(), 0);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return `${diffDays} hari lagi`;
              })()}
            </p>
          </CardFooter>

        </Fragment>
      ) : (
        <Fragment>
          <CardBody>
            <Skeleton className="aspect-video w-full rounded-lg bg-default-300" />
          </CardBody>
          <CardFooter className="flex flex-col items-start gap-2">
            <Skeleton className="h-4 w-3/5 rounded-lg bg-default-200" />
            <Skeleton className="h-4 w-4/5 rounded-lg bg-default-200" />
            <Skeleton className="h-4 w-2/5 rounded-lg bg-default-200" />
          </CardFooter>
        </Fragment>
      )}
    </Card>
  );
};

export default CardCampaign;
