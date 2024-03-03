import { useEffect, useState } from "react";

export const useCompanyInputSearch = (company: string) => {
  const [companySuggestions, setCompanySuggestions] = useState<CompanyModel[]>(
    []
  );
  useEffect(() => {
    if (company.length > 2) {
      (async () => {
        const [data ] = await 
      })();
    }
  }, [company]);
};
