class Task < ApplicationRecord
  enum status: [ :todo, :doing, :done ]
  belongs_to :project

  has_many :task_users, dependent: :destroy
  has_many :users, through: :task_users

  has_many :labelings
  has_many :labels, through: :labelings

  has_many :comments, dependent: :destroy


  def as_json(options={})
    super(:methods => [:users, :labels, :comments])
  end
end
