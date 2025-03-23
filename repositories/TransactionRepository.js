import { BaseRepository } from './BaseRepository.js';
import Transaction from '../models/transactionModel.js';

export class TransactionRepository extends BaseRepository {
  constructor() {
    super(Transaction);
  }

  async findByTransactionId(transactionId) {
    return await this.findOne({ 'details.transactionId': transactionId });
  }

  async findByOfferId(offerId) {
    return await this.findOne({ offer: offerId });
  }

  async updateTransactionStatus(id, status) {
    return await this.update(id, { status });
  }

  async createTransaction(transactionData) {
    return await this.create(transactionData);
  }
}