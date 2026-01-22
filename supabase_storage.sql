-- Create a new storage bucket for NFT images
insert into storage.buckets (id, name, public)
values ('nft-images', 'nft-images', true);

-- Policy to allow public access to images
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'nft-images' );

-- Policy to allow authenticated users (or everyone for this demo) to upload images
create policy "Allow Uploads"
on storage.objects for insert
with check ( bucket_id = 'nft-images' );
