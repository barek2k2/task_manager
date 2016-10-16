class Label < ApplicationRecord
  has_many :labelings
  has_many :tasks, through: :labelings
end
