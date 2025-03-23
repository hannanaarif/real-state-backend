import { BaseRepository } from './BaseRepository.js';
import Offer from '../models/offerModel.js';

export class OfferRepository extends BaseRepository {
  constructor() {
    super(Offer);
  }

  async findByBuyerId(buyerId) {
    return await this.find({ buyer: buyerId });
  }

  async findBySeller(sellerEmail) {
    return await this.find({ seller: sellerEmail });
  }

  async updateOfferStatus(id, status) {
    return await this.update(id, { status });
  }

  async createOffer(offerData) {
    return await this.create(offerData);
  }
}