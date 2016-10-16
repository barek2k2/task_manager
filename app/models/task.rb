class Task < ApplicationRecord
  enum status: [ :todo, :doing, :done ]
  belongs_to :project

  has_many :task_users, dependent: :destroy
  has_many :users, through: :task_users

  def as_json(options={})
    super(:methods => [:users])
  end
end
