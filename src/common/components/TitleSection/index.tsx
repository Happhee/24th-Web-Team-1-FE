"use client";
import React, { ReactElement, useState } from "react";

import ShareIcon from "public/assets/icon/share.svg";
import Tag from "../Tag";
import ExternalControlOpenDialog from "@shared/components/ExternalControlOpenDialog";
import { LINK_SHARE_CONTENT } from "@common/constants/linkShareContent";
import LinkShareContent from "../LinkShareContent";
import { usePathname } from "next/navigation";
import LinkSharedDescription from "../LinkShareDescription";

interface TitleSectionProps {
  category: string;
  title: string;
  editorComponent: ReactElement;
}

export default function TitleSection({
  category,
  title,
  editorComponent,
}: TitleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const onClickControlOpenDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="flex flex-col gap-[12px]">
        <Tag title={category} />
        <div className="flex items-center">
          <h1 className="h1-bold text-[28px] text-black">{title}</h1>
          <div className="ml-auto">
            <ShareIcon
              width={16}
              height={22}
              onClick={onClickControlOpenDialog}
            />
          </div>
        </div>
        <section className="mt-[2px]">{editorComponent}</section>
      </header>
      <ExternalControlOpenDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={LINK_SHARE_CONTENT.ARTICLE_INFO.TITLE}
        description={
          <LinkSharedDescription
            content={LINK_SHARE_CONTENT.ARTICLE_INFO.DESCRIPTION}
          />
        }
        content={
          <LinkShareContent
            href={`${process.env.NEXT_PUBLIC_FEW_WEB}${pathname}`}
          />
        }
      />
    </>
  );
}
