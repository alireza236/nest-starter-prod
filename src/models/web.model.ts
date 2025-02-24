export class WebResponse<T> {
	metas?: Record<string, string>;
	data?: T;
	errors?: string;
	message?: string;
	total_count?: number;
	paging?: Paging;
}

export class Paging {
	size: number;
	total_page: number;
	current_page: number;
}
