class Project < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged

  has_many :tasks, dependent: :destroy

  validates :title, presence: true

  def url
    Rails.application.routes.url_helpers.project_url(self)
  end

  def as_json(options)
    super(:methods => [:url, :tasks])
  end
end
