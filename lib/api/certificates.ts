"use client";

import { ApiListResponse, Certificate } from "@/types";
import { readState } from "@/lib/api/base";

export async function listCertificates(): Promise<ApiListResponse<Certificate>> {
  const state = await readState();
  return { data: state.certificates, total: state.certificates.length };
}
