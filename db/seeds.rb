# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |i|
  p = Project.create(title: Faker::Name.title, description: Faker::Hipster.paragraph)
  3.times do |j|
    t = p.tasks.create(title: Faker::Name.title, description: Faker::Hipster.paragraph)
  end
  puts "Project: #{p.title} created"
end
