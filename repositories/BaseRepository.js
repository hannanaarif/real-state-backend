// Base repository interface that defines standard database operations
export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async findOne(conditions) {
    return await this.model.findOne(conditions);
  }

  async find(conditions = {}) {
    return await this.model.find(conditions);
  }

  async create(data) {
    return await this.model.create(data);
  }

  async update(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async exists(conditions) {
    return await this.model.exists(conditions);
  }
}