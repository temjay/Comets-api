import { Injectable } from '@nestjs/common';

@Injectable()
export class CometsService {
    private comets = [
        {id: 1, name: "comet1", speed: "fast"},
        {id: 2, name: "comet2", speed: "slow"},
        {id: 3, name: "comet3", speed: "medium-paced"},
    ]

    // getComets() {
    //     return this.comets;
    // }

    getQueriedComets(speed) {
        if (speed) {
            return this.comets.filter(comet => comet.speed === speed);
        }
        
        return this.comets;
    }

    async getOneComet(id) {
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
