import { Injectable } from '@nestjs/common';

@Injectable()
export class CometsService {
    private comets = [
        {id: 1, name: "comet1", type: "fast"},
        {id: 2, name: "comet2", type: "slow"},
        {id: 3, name: "comet3", type: "medium-paced"},
    ]

    // getComets() {
    //     return this.comets;
    // }

    getQueriedComets(type) {
        if (type) {
            return this.comets.filter(comet => comet.type === type);
        }
        
        return this.comets;
    }
}
