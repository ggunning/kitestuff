import { BaseSite } from "@spartacus/core";

declare module '@spartacus/core' {
    interface BaseSite {
        requiresAuthentication?: boolean;    
    }
}

