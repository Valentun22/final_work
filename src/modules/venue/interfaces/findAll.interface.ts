interface FindAllOptions {
    search?: string;
    tags?: string[];
    averageCheck?: number;
    rating?: number;
    type?: string;
    features?: {
        wifi?: boolean;
        parking?: boolean;
        liveMusic?: boolean;
    };
    limit?: number;
    offset?: number;
}

export default FindAllOptions;