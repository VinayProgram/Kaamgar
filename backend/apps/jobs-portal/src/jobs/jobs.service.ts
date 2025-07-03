import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {

    async getJobs() {
        // Logic to fetch jobs from the database or any other source
        return [
            { id: 1, title: 'Software Engineer', company: 'Tech Corp' },
            { id: 2, title: 'Data Scientist', company: 'Data Inc.' },
            { id: 3, title: 'Product Manager', company: 'Product Co.' }
        ];
    }
}
