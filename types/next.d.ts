// src/types/next.d.ts
import type { NextComponentType } from 'next';

declare module 'next' {
  export type PageProps = {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[]>;
  };

  export type NextPage<P = {}, IP = P> = NextComponentType<PageProps, IP, P>;
}