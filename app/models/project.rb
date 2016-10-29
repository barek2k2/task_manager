class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :tasks, dependent: :destroy

  validates :title, presence: true

  def url
    Rails.application.routes.url_helpers.project_url(self)
  end

  def tasks_count
    self.tasks.count
  end

  def assignees_count
    total = 0
    self.tasks.each do |task|
      total += task.users.count
    end
    total
  end

  def as_json(options)
    super(:methods => [:url, :tasks, :tasks_count, :assignees_count])
  end
end
