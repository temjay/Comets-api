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

    getOneComet(id) {
        const comet = this.comets.find(comet => comet.id === id);
        
        if(!comet) {
            throw new Error(`Comet with id ${id} not found`);
        }

        return comet;
    }

    createComet(createCometDto) {
        const newComet = {
            id: Date.now(),
            ...createCometDto,
        };

        this.comets.push(newComet);
        return newComet;
    }

    updateComet(id, updateCometDto) {
        this.comets = this.comets.map(comet => {
            if(comet.id === id) {
                return {
                    ...comet,
                    ...updateCometDto,
                }
            }
            return comet;
        });
    }

    deleteComet(id) {
        const toBeRemoved = this.getOneComet(id);

        this.comets = this.comets.filter(comet => comet.id !== id);
        return toBeRemoved;
    }
}
